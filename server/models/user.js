const pool = require("../config/db");

// Create User
const createUser = async (name, email, role, password) => {
  const result = await pool.query("INSERT INTO users (name, email, role, password) VALUES ($1, $2, $3, $4) RETURNING *",[name, email, role, password]);
  return result.rows[0];
};

//get user by email
const getUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

// Get All Users
const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

// Get User by ID
const getUserById = async (user_id) => {
  const result = await pool.query("SELECT * FROM users WHERE user_id = $1",[user_id]);
  return result.rows[0];
};

// Delete User
const deleteUser = async (user_id) => {
  await pool.query("DELETE FROM users WHERE user_id = $1", [user_id]);
};

module.exports = {createUser,getAllUsers, getUserById,deleteUser,getUserByEmail};