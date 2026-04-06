import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold text-blue-400">LibraryMS</h1>

      {/* Links */}
      <div className="flex gap-6 items-center">
        <Link to="/dashboard" className="hover:text-blue-400"> Dashboard</Link>
        <Link to="/books" className="hover:text-blue-400">Books</Link>
        <Link to="/borrow" className="hover:text-blue-400">Borrow</Link>
        <Link to="/overdue" className="hover:text-blue-400">Overdue</Link>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;