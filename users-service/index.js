const { ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('usersdb', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
}, {
  tableName: 'users',
  timestamps: false
});

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.findAll();
      return users.map(u => u.get({ plain: true }));
    },
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      const user = await User.create({ name, email });
      return user.get({ plain: true });
    },
    updateUser: async (_, { id, name, email }) => {
      const user = await User.findByPk(id);
      if (!user) return null;
      await user.update({ name, email });
      return user.get({ plain: true });
    },
    deleteUser: async (_, { id }) => {
      const deleted = await User.destroy({ where: { id } });
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
    console.log('Connected to Postgres (usersdb)');

    await server.listen(4001);
    console.log('Users service ready at http://localhost:4001');
  } catch (err) {
    console.error('Failed to start Users service:', err);
  }
}

start();
