import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Borrow from "./pages/Borrow";
import Overdue from "./pages/Overdue";

function App() {
   const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
        {token && <Navbar />}
        <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/borrow" element={<Borrow />} />
        <Route path="/overdue" element={<Overdue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;