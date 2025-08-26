import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";

export default function Products() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="section">
      <h2>Products</h2>
      {data.products.map((product) => (
        <div className="card" key={product.id}>
          <p className="card-title">{product.name}</p>
          <p className="card-text">${product.price}</p>
        </div>
      ))}
    </div>
  );
}