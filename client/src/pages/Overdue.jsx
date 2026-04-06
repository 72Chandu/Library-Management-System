import { useEffect, useState } from "react";
import API from "../api/axios";

function Overdue() {
  const [overdueBooks, setOverdueBooks] = useState([]);
  useEffect(() => {
    fetchOverdue();
  }, []);

  const fetchOverdue = async () => {
    try {
      const res = await API.get("/borrow/overdue");
      setOverdueBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">⏰ Overdue Books & Fines</h2>
      {overdueBooks.length === 0 ? (
        <p className="text-center text-gray-500">No overdue books 🎉</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {overdueBooks.map((book) => (
            <div key={book.borrow_id} className="bg-white border-l-4 border-red-500 rounded-2xl shadow-md p-5 hover:shadow-xl transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Title: {book.title}</h3>
              <p className="text-gray-600 text-sm">Author: {book.author}</p>
              <p className="text-gray-500 text-sm mb-2">Genre: {book.genre}</p>
              <p className="text-red-500 font-medium text-sm">Due: {book.due_date?.slice(0, 10)}</p>
              <p className="text-orange-500 text-sm mt-1">Late by: {book.overdueDays} days</p>
              <p className="text-red-600 font-bold mt-2">Fine: ₹{book.fine}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Overdue;