const { ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('productsdb', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
}, {
  tableName: 'products',
  timestamps: false
});

const typeDefs = gql`
  type Product @key(fields: "id") {
    id: ID!
    name: String!
    price: Float!
  }

  type Query {
    products: [Product]
  }

  type Mutation {
    createProduct(name: String!, price: Float!): Product
    updateProduct(id: ID!, name: String, price: Float): Product
    deleteProduct(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    products: async () => {
      const products = await Product.findAll();
      return products.map(p => p.get({ plain: true }));
    },
  },
  Mutation: {
    createProduct: async (_, { name, price }) => {
      const product = await Product.create({ name, price });
      return product.get({ plain: true });
    },
    updateProduct: async (_, { id, name, price }) => {
      const product = await Product.findByPk(id);
      if (!product) return null;
      await product.update({ name, price });
      return product.get({ plain: true });
    },
    deleteProduct: async (_, { id }) => {
      const deleted = await Product.destroy({ where: { id } });
      return deleted > 0;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Connected to Postgres (productsdb)');

    await server.listen(4003);
    console.log('Products service ready at http://localhost:4003');
  } catch (err) {
    console.error('Failed to start Products service:', err);
  }
}

start();
