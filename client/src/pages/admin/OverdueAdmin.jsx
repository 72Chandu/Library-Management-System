import { useEffect, useState } from "react";
import API from "../../api/axios";

function OverdueAdmin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/borrow/overdue").then(res => setData(res.data));
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-3xl mb-6">⏰ Overdue</h2>
      {data.map((d,i)=>(
        <div key={i} className="bg-red-100 p-4 mb-2">
          <p>{d.name} - {d.title}</p>
          <p>Fine: ₹{d.fine}</p>
        </div>
      ))}

    </div>
  );
}
export default OverdueAdmin;