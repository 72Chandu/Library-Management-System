import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-2xl shadow-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">📚 Welcome to Library Management System</h1>
        <p className="text-lg opacity-90">Manage books, track borrowings, and explore knowledge effortlessly.</p>
      </div>

      {/* Quick Actions */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">🚀Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {/* View Books */}
        <div onClick={() => navigate("/books")} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition duration-300">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">📖 View Books</h3>
          <p className="text-gray-600">Browse all available books in the library.</p>
        </div>

        {/* Borrow */}
        <div onClick={() => navigate("/borrow")} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition duration-300">
          <h3 className="text-xl font-semibold text-green-600 mb-2">📥 Borrow Book</h3>
          <p className="text-gray-600">Borrow books easily with a single click.</p>
        </div>

        {/* Overdue */}
        <div onClick={() => navigate("/overdue")} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition duration-300">
          <h3 className="text-xl font-semibold text-red-500 mb-2">⏰ Overdue & Fines</h3>
          <p className="text-gray-600">Track overdue books and manage fines.</p>
        </div>
      </div>

      {/* Footer Message */}
      <div className="mt-10 text-center text-gray-500"><p>✨ Keep reading, keep growing ✨</p></div>
    </div>
  );
}
export default Dashboard;