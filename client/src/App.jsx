import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Borrow from "./pages/Borrow";
import Overdue from "./pages/Overdue";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddBook from "./pages/admin/AddBook";
import ManageBooks from "./pages/admin/ManageBooks";
import ManageUsers from "./pages/admin/ManageUsers";
import BorrowedUsers from "./pages/admin/BorrowedUsers";
import OverdueAdmin from "./pages/admin/OverdueAdmin";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  // console.log("AdminRoute role:", role); //not printing any thig
  return role === "admin" ? children : <Navigate to="/dashboard" />;
};
function App() {
   const token = localStorage.getItem("token");
   return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />
      {token && <Navbar />}
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>} />
        <Route path="/borrow" element={<PrivateRoute><Borrow /></PrivateRoute>} />
        <Route path="/overdue" element={<PrivateRoute><Overdue /></PrivateRoute>} />

        {/* Admin */}
        <Route path="/admin" element={<PrivateRoute><AdminRoute><AdminDashboard /></AdminRoute></PrivateRoute>} />
        <Route path="/admin/add-book" element={<PrivateRoute><AdminRoute><AddBook /></AdminRoute></PrivateRoute>} />
        <Route path="/admin/books" element={<PrivateRoute><AdminRoute><ManageBooks /></AdminRoute></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute><AdminRoute><ManageUsers /></AdminRoute></PrivateRoute>} />
        <Route path="/admin/borrowed" element={<PrivateRoute><AdminRoute><BorrowedUsers /></AdminRoute></PrivateRoute>} />
        <Route path="/admin/overdue" element={<PrivateRoute><AdminRoute><OverdueAdmin /></AdminRoute></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;