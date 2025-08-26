import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/queries";

export default function Users() {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div className="section">
      <h2>Users</h2>
      {data.users.map((user) => (
        <div className="card" key={user.id}>
          <p className="card-title">{user.name}</p>
          <p className="card-text">{user.email}</p>
        </div>
      ))}
    </div>
  );
}
