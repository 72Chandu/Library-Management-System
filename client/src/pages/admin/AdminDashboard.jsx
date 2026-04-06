import { Link } from "react-router-dom";

function AdminDashboard() {
  const card ="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center font-semibold cursor-pointer";
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">🛠 Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/add-book" className={card}>➕ Add Book</Link>
        <Link to="/admin/books" className={card}>📚 Manage Books</Link>
        <Link to="/admin/users" className={card}>👤 Manage Users</Link>
        <Link to="/admin/borrowed" className={card}>👥 Borrowed Users</Link>
        <Link to="/admin/overdue" className={card}>⏰ Overdue</Link>
      </div>
    </div>
  );
}
export default AdminDashboard;