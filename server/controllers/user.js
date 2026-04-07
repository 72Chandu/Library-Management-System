const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single User
exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.deleteUser(id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SIGNUP
exports.signup = async (req, res) => {
  const { name, email, role, password } = req.body;
  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(name,email,role,hashedPassword);
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign({ user_id: user.user_id, role: user.role },process.env.JWT_SECRET,{ expiresIn: "1d" });
    res.json({ message: "Login successful", token,role:user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Logged out successfully"});
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.toggleBlockUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    await pool.query(`UPDATE users  SET is_blocked = NOT is_blocked WHERE user_id = $1`, [user_id]);
    res.json({ message: "User status updated" });
  } catch (err) {
    console.error("BLOCK ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const books = await pool.query("SELECT COUNT(*) FROM books");
    const users = await pool.query("SELECT COUNT(*) FROM users");
    const borrowed = await pool.query(
      "SELECT COUNT(*) FROM borrowed_books WHERE return_date IS NULL"
    );

    res.json({
      books: Number(books.rows[0].count),
      users: Number(users.rows[0].count),
      borrowed: Number(borrowed.rows[0].count),
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};