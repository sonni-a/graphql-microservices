import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../graphql/queries";

export default function Orders() {
  const { loading, error, data } = useQuery(GET_ORDERS);
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders</p>;

  return (
    <div className="section">
      <h2>Orders</h2>
      {data.orders.map((order) => (
        <div className="card" key={order.id}>
          <p className="card-title">Order ID: {order.id}</p>
          <p className="card-text">User ID: {order.userId}</p>
          <p className="card-text">Product ID: {order.productId}</p>
          <p className="card-text">Quantity: {order.quantity}</p>
        </div>
      ))}
    </div>
  );
}
