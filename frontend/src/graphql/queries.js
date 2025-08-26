import { gql } from "@apollo/client";

// Users
export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

// Products
export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
    }
  }
`;

// Orders
export const GET_ORDERS = gql`
  query {
    orders {
      id
      productId
      userId
      quantity
    }
  }
`;