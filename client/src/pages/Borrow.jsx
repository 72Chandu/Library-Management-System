import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function Borrow() {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loadingId, setLoadingId] = useState(null);
    useEffect(() => {
        fetchBorrowedBooks();
    }, []);

    const fetchBorrowedBooks = async () => {
        try {
            const res = await API.get("/borrow/get");
            //   console.log("Borrowed Books:", res.data);
            setBorrowedBooks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    //RETURN BOOK
    const handleReturn = async (borrow_id, book_id) => {
        try {
            setLoadingId(borrow_id);
            await API.post("/borrow/return", { borrow_id, book_id });
            toast.success("Book returned successfully!");
            fetchBorrowedBooks();
        } catch (err) {
            toast.error(err.response?.data?.error || "Return failed");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">📖 My Borrowed Books</h2>
            {borrowedBooks.length === 0 ? (
                <p className="text-center text-gray-500">You have not borrowed any books yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {borrowedBooks.map((item) => (
                        <div key={item.borrow_id} className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm mb-1">{item.author}</p>
                            <p className="text-gray-500 text-sm mb-2">{item.genre}</p>

                            {/* Due Date */}
                            <p className="text-yellow-600 font-medium text-sm">Due: {item.due_date?.slice(0, 10)}</p>

                            {/* Return Button */}
                            <button
                                onClick={() => handleReturn(item.borrow_id, item.book_id)}
                                disabled={loadingId === item.borrow_id}
                                className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                            >
                                {loadingId === item.borrow_id ? "Processing..." : "Return"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Borrow;