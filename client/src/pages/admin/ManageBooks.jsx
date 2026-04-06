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
    const res = await API.get(`/admin/books?search=${search}&page=${page}&limit=${limit}`);
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
      <input placeholder="Search..." className="border p-2 w-full mb-4" onChange={(e)=>setSearch(e.target.value)}/>
      {books.map((b) => (
        <div key={b.book_id} className="bg-white p-4 mb-2 flex justify-between rounded">
          <div>
            <h3>{b.title}</h3>
            <p>{b.author} | {b.genre}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>setEditBook(b)} className="bg-yellow-500 px-3 text-white">Edit</button>
            <button onClick={()=>handleDelete(b.book_id)} className="bg-red-500 px-3 text-white">Delete</button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button onClick={()=>setPage(page-1)}>Prev</button>
        <span>{page}</span>
        <button onClick={()=>setPage(page+1)}>Next</button>
      </div>

      {/* Edit Modal */}
      {editBook && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
          <div className="bg-white p-6">
            <input value={editBook.title} onChange={(e)=>setEditBook({...editBook,title:e.target.value})}/>
            <button onClick={handleUpdate}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default ManageBooks;