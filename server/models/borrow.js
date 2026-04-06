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

// Get overdue books
const getOverdueBooks = async () => {
  const result = await pool.query(`SELECT * FROM borrowed_books WHERE return_date IS NULL AND due_date < CURRENT_DATE`);
  return result.rows;
};

// Calculate fine
const calculateFine = (due_date) => {
  const today = new Date();
  const due = new Date(due_date);
  const diffTime = today - due;
  const daysLate = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return daysLate > 0 ? daysLate * 10 : 0; // ₹10 per day
};

//GET USER BORROWED BOOKS
const getUserBorrowedBooks = async (user_id) => {
  const result = await pool.query(
    `SELECT 
      b.borrow_id, b.book_id, bk.title,bk.author,
      bk.genre,b.borrow_date,b.due_date
     FROM borrowed_books b
     JOIN books bk ON b.book_id = bk.book_id
     WHERE b.user_id = $1 AND b.return_date IS NULL
     ORDER BY b.borrow_date DESC`,
    [user_id]
  );
  return result.rows;
};

const getBorrowedGrouped = async () => {
  const result = await pool.query(
    `SELECT 
      u.user_id,
      u.name,
      bk.title,
      bk.author,
      b.borrow_date,
      b.due_date
     FROM borrowed_books b
     JOIN users u ON b.user_id = u.user_id
     JOIN books bk ON b.book_id = bk.book_id
     WHERE b.return_date IS NULL
     ORDER BY u.user_id, b.borrow_date`
  );

  return result.rows;
};

module.exports = {createBorrow,getActiveBorrow,returnBook,getOverdueBooks,calculateFine,getUserBorrowedBooks,getBorrowedGrouped};