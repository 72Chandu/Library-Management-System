import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold text-blue-400">📚 LibraryMS</h1>
      <div className="flex gap-6 items-center">
        {role !== "admin" && (
          <>
            <Link to="/dashboard" className="hover:text-blue-400"> Dashboard</Link>
            <Link to="/books" className="hover:text-blue-400">Books</Link>
            <Link to="/borrow" className="hover:text-blue-400">Borrow</Link>
            <Link to="/overdue" className="hover:text-blue-400">Overdue</Link>
          </>
        )}
        {role === "admin" && (
          <Link to="/admin" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Admin Panel</Link>
        )}
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
      </div>
    </nav>
  );
}
export default Navbar;