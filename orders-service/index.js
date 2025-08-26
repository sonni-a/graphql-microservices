const { ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ordersdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Order = mongoose.model('Order', new mongoose.Schema({
  userId: String,   // лучше String, чтобы совпадало с ID!
  productId: String,
  quantity: Number,
}));

const typeDefs = gql`
  type Order @key(fields: "id") {
    id: ID!
    userId: ID!
    productId: ID!
    quantity: Int!
    user: User
    product: Product
  }

  extend type User @key(fields: "id") {
    id: ID! @external
  }

  extend type Product @key(fields: "id") {
    id: ID! @external
  }

  type Query {
    orders: [Order]
    order(id: ID!): Order
  }

  type Mutation {
    createOrder(userId: ID!, productId: ID!, quantity: Int!): Order
    updateOrder(id: ID!, userId: ID, productId: ID, quantity: Int): Order
    deleteOrder(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    orders: async () => {
      const orders = await Order.find();
      return orders.map(o => ({
        id: o._id.toString(),
        userId: o.userId,
        productId: o.productId,
        quantity: o.quantity,
      }));
    },
    order: async (_, { id }) => {
      const o = await Order.findById(id);
      if (!o) return null;
      return {
        id: o._id.toString(),
        userId: o.userId,
        productId: o.productId,
        quantity: o.quantity,
      };
    },
  },
  Order: {
    user: (order) => ({ __typename: "User", id: order.userId }),
    product: (order) => ({ __typename: "Product", id: order.productId }),
  },
  Mutation: {
    createOrder: async (_, args) => {
      const order = await Order.create(args);
      return {
        id: order._id.toString(),
        userId: order.userId,
        productId: order.productId,
        quantity: order.quantity,
      };
    },
    updateOrder: async (_, { id, ...rest }) => {
      const order = await Order.findById(id);
      if (!order) return null;
      Object.assign(order, rest);
      await order.save();
      return {
        id: order._id.toString(),
        userId: order.userId,
        productId: order.productId,
        quantity: order.quantity,
      };
    },
    deleteOrder: async (_, { id }) => !!(await Order.findByIdAndDelete(id)),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

server.listen(4002).then(({ url }) => {
  console.log(`Orders service ready at ${url}`);
});
