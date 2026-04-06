import { useEffect, useState } from "react";
import API from "../../api/axios";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    API.get("/users/get").then(res => setUsers(res.data));
  }, []);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl mb-6">👤 Users</h2>
      {users.map(u => (
        <div key={u.user_id} className="bg-white p-4 mb-2 flex justify-between">
          <div>
            <h3>{u.name}</h3>
            <p>{u.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ManageUsers;