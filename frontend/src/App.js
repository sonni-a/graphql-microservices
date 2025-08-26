import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Users from "./components/Users";
import Products from "./components/Products";
import Orders from "./components/Orders";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app-container">
        <h1>GraphQL Microservices Demo</h1>
        <Users />
        <Products />
        <Orders />
      </div>
    </ApolloProvider>
  );
}