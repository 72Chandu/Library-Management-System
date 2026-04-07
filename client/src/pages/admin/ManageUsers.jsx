import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await API.get("/users/get");
    setUsers(res.data);
  };

  //Filter Logic
  const filteredUsers = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filter === "all" ? true : u.role === filter;
    return matchSearch && matchRole;
  });

  //Stats
  const totalUsers = users.length;
  const totalAdmins = users.filter(u => u.role === "admin").length;
  const totalMembers = users.filter(u => u.role === "member").length;

  //Block / Unblock
  const handleBlock = async (id) => {
    await API.put(`/users/block/${id}`);
    toast.success("User status updated");
    fetchUsers();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">👤 Manage Users</h2>
      {/*STATS (Clickable) */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div onClick={() => setFilter("all")} className="bg-white p-4 rounded-xl shadow text-center cursor-pointer hover:bg-gray-100" >
          <h3 className="text-xl font-bold text-blue-600">{totalUsers}</h3>
          <p>Total</p>
        </div>

        <div onClick={() => setFilter("admin")} className="bg-white p-4 rounded-xl shadow text-center cursor-pointer hover:bg-gray-100" >
          <h3 className="text-xl font-bold text-purple-600">{totalAdmins}</h3>
          <p>Admins</p>
        </div>

        <div onClick={() => setFilter("member")} className="bg-white p-4 rounded-xl shadow text-center cursor-pointer hover:bg-gray-100">
          <h3 className="text-xl font-bold text-green-600">{totalMembers}</h3>
          <p>Members</p>
        </div>
      </div>
      <input placeholder="Search..." className="w-full p-3 mb-6 border rounded" value={search} onChange={(e) => setSearch(e.target.value)}/>
      
      {/* USERS */}
      <div className="grid gap-4">
        {filteredUsers.map((u) => (
          <div key={u.user_id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{u.name}</h3>
              <p className="text-gray-500">{u.email}</p>
              <p className="text-xs text-gray-400">Joined: {new Date(u.created_at).toLocaleDateString()}</p>
              <span className={`text-xs px-2 py-1 rounded ${u.role === "admin" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600" }`}>{u.role}</span>
              <span className={`ml-2 text-xs px-2 py-1 rounded ${ u.is_blocked ? "bg-red-100 text-red-600": "bg-green-100 text-green-600"}`}>{u.is_blocked ? "Blocked" : "Active"}</span>
            </div>
            <button onClick={() => handleBlock(u.user_id)} className={`px-3 py-1 rounded text-white ${u.is_blocked ? "bg-green-500 hover:bg-green-600"  : "bg-red-500 hover:bg-red-600" }`}>{u.is_blocked ? "Unblock" : "Block"}</button>
          </div>
        ))}
      </div>
      {filteredUsers.length === 0 && (
        <p className="text-center mt-10 text-gray-500"> No users found</p>
      )}
    </div>
  );
}
export default ManageUsers;