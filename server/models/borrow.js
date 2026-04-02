const pool = require("../config/db");

// Create borrow record
const createBorrow = async (user_id, book_id, days, client) => {
  const result = await client.query(`INSERT INTO borrowed_books (user_id, book_id, due_date) VALUES ($1, $2, CURRENT_DATE + $3 * INTERVAL '1 day') RETURNING *`,[user_id, book_id, days]);
  return result.rows[0];
};

// Get active borrow
const getActiveBorrow = async (user_id, book_id) => {
  const result = await pool.query(`SELECT * FROM borrowed_books WHERE user_id=$1 AND book_id=$2 AND return_date IS NULL`, [user_id, book_id]);
  return result.rows[0];
};

// Return book
const returnBook = async (borrow_id, client) => {
  const result = await client.query(`UPDATE borrowed_books SET return_date = CURRENT_DATE WHERE borrow_id=$1 RETURNING *`,[borrow_id]);
  return result.rows[0];
};

module.exports = {createBorrow,getActiveBorrow,returnBook,};