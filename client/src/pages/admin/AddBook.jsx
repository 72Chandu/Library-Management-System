import { useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

function AddBook() {
  const [rows, setRows] = useState([{ title: "", author: "", genre: "", copies: "" },]);
  const handleChange = (i, field, value) => {
    const updated = [...rows];
    updated[i][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([...rows, { title: "", author: "", genre: "", copies: "" }]);
  };

  const handleSubmit = async () => {
    try {
      for (let r of rows) {
        if (!r.title) continue;

        await API.post("/books/add", {
          title: r.title,
          author: r.author,
          genre: r.genre,
          copies_available: Number(r.copies),
        });
      }
      toast.success("Books added!");
    } catch {
      toast.error("Error");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">➕ Add Books</h2>
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-4 gap-2 mb-2">
          <input placeholder="Title" onChange={(e)=>handleChange(i,"title",e.target.value)} className="border p-2"/>
          <input placeholder="Author" onChange={(e)=>handleChange(i,"author",e.target.value)} className="border p-2"/>
          <input placeholder="Genre" onChange={(e)=>handleChange(i,"genre",e.target.value)} className="border p-2"/>
          <input type="number" placeholder="Copies" onChange={(e)=>handleChange(i,"copies",e.target.value)} className="border p-2"/>
        </div>
      ))}

      <div className="flex gap-4 mt-4">
        <button onClick={addRow} className="bg-green-500 text-white px-4 py-2 rounded">Add Row</button>
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-2 rounded">Save</button>
      </div>
    </div>
  );
}
export default AddBook;