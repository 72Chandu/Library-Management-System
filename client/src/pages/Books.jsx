import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function Books() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books/get");
      // console.log(res.data);
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBorrow = async (book_id) => {
    try {
      await API.post("/borrow", {book_id,days: 7});
      toast.success("Book borrowed successfully!", {theme: "dark"});
      fetchBooks();
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">📚 Library Books</h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {books.map((book) => (
          <div key={book.book_id} className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300">
            {/* Book Title */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h3>

            {/* Author */}
            <p className="text-gray-600 mb-1"><span className="font-medium">Author:</span> {book.author} </p>

            {/* Genre */}
            <p className="text-gray-600 mb-1"><span className="font-medium">Genre:</span> {book.genre}</p>

            {/* Copies */}
            <p
              className={`mt-2 font-semibold ${book.copies_available > 0
                  ? "text-green-600"
                  : "text-red-500"
                }`}
            >
              {book.copies_available > 0
                ? `Available: ${book.copies_available}`
                : "Out of Stock"}
            </p>

            {/* Button */}
            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              disabled={book.copies_available === 0}
              onClick={() => handleBorrow(book.book_id)}
            >
              Borrow
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}
export default Books;