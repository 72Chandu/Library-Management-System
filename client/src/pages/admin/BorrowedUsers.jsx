import { useEffect, useState } from "react";
import API from "../../api/axios";

function BorrowedUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [openUser, setOpenUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("/borrow/get-all");
    setUsers(res.data);
  };

  // 🔍 Search
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // 📥 EXPORT CSV
  const exportCSV = () => {
    let csv = "User,Book,Author,Borrow Date,Due Date,Fine\n";

    users.forEach((user) => {
      user.books.forEach((book) => {
        csv += `${user.name},${book.title},${book.author},${book.borrow_date},${book.due_date},${book.fine}\n`;
      });
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "borrowed_report.csv";
    a.click();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h2 className="text-3xl font-bold mb-6">
        📖 Borrowed Books (User Wise)
      </h2>

      {/* 🔍 SEARCH + EXPORT */}
      <div className="flex justify-between mb-6 gap-4">

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm"
        />

        <button
          onClick={exportCSV}
          className="bg-green-500 text-white px-4 rounded hover:bg-green-600"
        >
          📥 Export CSV
        </button>

      </div>

      {filteredUsers.map((user) => {
        const isOpen = openUser === user.user_id;

        // 📊 Total Fine
        const totalFine = user.books.reduce(
          (sum, b) => sum + b.fine,
          0
        );

        return (
          <div key={user.user_id} className="mb-4 bg-white rounded-xl shadow">

            {/* USER HEADER */}
            <div
              onClick={() =>
                setOpenUser(isOpen ? null : user.user_id)
              }
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
            >
              <div>
                <h3 className="text-lg font-semibold text-blue-600">
                  👤 {user.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Books: {user.books.length} | 💰 Fine: ₹{totalFine}
                </p>
              </div>

              <span>{isOpen ? "🔽" : "▶️"}</span>
            </div>

            {/* TABLE */}
            {isOpen && (
              <div className="p-4 border-t overflow-x-auto">

                <table className="w-full text-center">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-2">Sr</th>
                      <th className="p-2">Book</th>
                      <th className="p-2">Author</th>
                      <th className="p-2">Borrow</th>
                      <th className="p-2">Due</th>
                      <th className="p-2">Fine</th>
                    </tr>
                  </thead>

                  <tbody>
                    {user.books.map((book, index) => {
                      const isOverdue = book.fine > 0;

                      return (
                        <tr
                          key={index}
                          className={`border-t ${
                            isOverdue
                              ? "bg-red-100"
                              : "bg-green-50"
                          }`}
                        >
                          <td className="p-2">{index + 1}</td>
                          <td className="p-2">{book.title}</td>
                          <td className="p-2">{book.author}</td>

                          <td className="p-2">
                            {book.borrow_date?.slice(0, 10)}
                          </td>

                          <td className="p-2">
                            {book.due_date?.slice(0, 10)}
                          </td>

                          <td className="p-2 font-bold">
                            ₹{book.fine}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

              </div>
            )}
          </div>
        );
      })}

      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No users found
        </p>
      )}

    </div>
  );
}

export default BorrowedUsers;