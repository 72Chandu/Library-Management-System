import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState({
    books: 0,
    users: 0,
    borrowed: 0,
  });

  const [dark, setDark] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  //Fetch stats
  const fetchStats = async () => {
    try {
      const res = await API.get("/users/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const card = "bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition text-center font-semibold cursor-pointer flex flex-col items-center gap-2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-2">🛠 Admin Dashboard</h1>
      </div>

      {/*STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
        <div className="bg-white  p-6 rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold text-blue-600">{stats.books}</h2>
          <p className="text-black-500 ">Total Books</p>
        </div>

        <div className="bg-white  p-6 rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold text-purple-600">{stats.users}</h2>
          <p className="text-black-500 ">Users</p>
        </div>

        <div className="bg-white  p-6 rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold text-green-600">{stats.borrowed}</h2>
          <p className="text-black-500 ">Borrowed</p>
        </div>

      </div>

      {/* ACTION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Link to="/admin/add-book" className={card}>
          <span className={card}>
            <span className="text-4xl">➕</span>
            Add Book
          </span>
        </Link>

        <Link to="/admin/books" className={card}>
          <span className={card}>
            <span className="text-4xl">📚</span>
            Manage Books
          </span>
        </Link>

        <Link to="/admin/users" className={card}>
          <span className={card}>
            <span className="text-4xl">👤</span>
            Manage Users
          </span>
        </Link>

        <Link to="/admin/borrowed" className={card}>
          <span className={card}>
            <span className="text-4xl">👥</span>
            Borrowed Users
          </span>
        </Link>

        <Link to="/admin/overdue" className={card}>
          <span className={card}>
            <span className="text-4xl">⏰</span>
            Overdue Books
          </span>
        </Link>
      </div>
    </div>
  );
}
export default AdminDashboard;