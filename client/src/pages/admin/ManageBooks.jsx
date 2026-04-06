import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [editBook, setEditBook] = useState(null);

  const limit = 5;

  useEffect(() => {
    fetchBooks();
  }, [search, page]);

  const fetchBooks = async () => {
    const res = await API.get(`/books/get-all?search=${search}&page=${page}&limit=${limit}`);
    setBooks(res.data.data);
    setTotal(res.data.total);
  };

  const handleDelete = async (id) => {
    await API.delete(`/books/delete/${id}`);
    toast.success("Deleted");
    fetchBooks();
  };

  const handleUpdate = async () => {
    await API.put(`/books/update/${editBook.book_id}`, editBook);
    toast.success("Updated");
    setEditBook(null);
    fetchBooks();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">📚 Manage Books</h2>
      {/*SEARCH */}
      <input placeholder="Search..." className="border p-3 w-full mb-6 rounded shadow-sm" onChange={(e) => { setPage(1); setSearch(e.target.value); }} />

      {/*BOOK LIST */}
      <div className="grid gap-4">
        {books.map((b) => (
          <div key={b.book_id} className="bg-white p-4 flex justify-between rounded-xl shadow hover:shadow-lg transition" >
            <div>
              <h3 className="font-semibold text-lg">{b.title}</h3>
              <p className="text-gray-600"> {b.author} | {b.genre} </p>
              <p className="text-green-600"> Copies: {b.copies_available} </p>
            </div>

            <div className="flex gap-2 items-center">
              <button onClick={() => setEditBook(b)} className="bg-yellow-500 px-3 py-1 text-white rounded hover:bg-yellow-600" >Edit</button>
              <button onClick={() => handleDelete(b.book_id)} className="bg-red-500 px-3 py-1 text-white rounded hover:bg-red-600">Delete </button>
            </div>
          </div>
        ))}
      </div>

      {/*PAGINATION */}
      <div className="flex justify-center gap-4 mt-6">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="bg-gray-300 px-4 py-1 rounded">Prev</button>
        <span className="font-semibold"> Page {page} </span>
        <button onClick={() => setPage(page + 1)} disabled={books.length < limit} className="bg-gray-300 px-4 py-1 rounded"> Next</button>
      </div>

      {/*EDIT MODAL */}
      {editBook && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-center">✏️ Edit Book </h3>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                <input value={editBook.title} onChange={(e) => setEditBook({ ...editBook, title: e.target.value }) } className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                <input value={editBook.author} onChange={(e) =>setEditBook({ ...editBook, author: e.target.value })} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"> Genre</label>
                <input value={editBook.genre} onChange={(e) =>setEditBook({ ...editBook, genre: e.target.value }) } className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Copies </label>
                <input type="number" value={editBook.copies_available} onChange={(e) => setEditBook({ ...editBook,copies_available: e.target.value, })} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"/>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button onClick={() => setEditBook(null)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
              <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" >Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ManageBooks;