const pool = require("../config/db");

// Create Book
const createBook = async (title, author, genre, copies) => {
  const result = await pool.query(
    "INSERT INTO books (title, author, genre, copies_available) VALUES ($1,$2,$3,$4) RETURNING *",
    [title, author, genre, copies]
  );
  return result.rows[0];
};

// Get All Books
const getAllBooks = async (search, page, limit) => {
  const offset = (page - 1) * limit;

  const result = await pool.query(
    `SELECT * FROM books
     WHERE title ILIKE $1 OR author ILIKE $1 OR genre ILIKE $1
     ORDER BY book_id DESC
     LIMIT $2 OFFSET $3`,
    [`%${search}%`, limit, offset]
  );

  const countRes = await pool.query(
    `SELECT COUNT(*) FROM books
     WHERE title ILIKE $1 OR author ILIKE $1 OR genre ILIKE $1`,
    [`%${search}%`]
  );

  return {
    data: result.rows,
    total: Number(countRes.rows[0].count),
  };
};

// Get Book by ID
const getBookById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM books WHERE book_id = $1",
    [id]
  );
  return result.rows[0];
};

// Update Book
const updateBook = async (id, title, author, genre, copies) => {
  const result = await pool.query(
    `UPDATE books 
     SET title=$1, author=$2, genre=$3, copies_available=$4
     WHERE book_id=$5
     RETURNING *`,
    [title, author, genre, copies, id]
  );
  return result.rows[0];
};

// Delete Book
const deleteBook = async (id) => {
  await pool.query("DELETE FROM books WHERE book_id=$1", [id]);
};
module.exports = {createBook,getAllBooks,getBookById,updateBook,deleteBook,};