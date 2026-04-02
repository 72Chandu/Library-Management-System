const pool = require("../config/db");
const bookModel = require("../models/book");
const borrowModel = require("../models/borrow");

// BORROW BOOK
exports.borrowBook = async (req, res) => {
  const user_id = req.user.user_id; // from JWT
  const { book_id, days } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. check book
    const book = await bookModel.getBookById(book_id);
    if (!book) throw new Error("Book not found");
    if (book.copies_available <= 0) {
      throw new Error("No copies available");
    }

    // 2. check if already borrowed
    const existing = await borrowModel.getActiveBorrow(user_id, book_id);
    if (existing) {
      throw new Error("You already borrowed this book");
    }

    // 3. create borrow
    const borrow = await borrowModel.createBorrow(user_id,book_id,days,client);

    // 4. decrease copies
    await client.query("UPDATE books SET copies_available = copies_available - 1 WHERE book_id=$1",[book_id]);
    await client.query("COMMIT");
    res.json({ message: "Book borrowed", borrow });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
};

exports.returnBook = async (req, res) => {
  const { borrow_id } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. return book
    const borrow = await borrowModel.returnBook(borrow_id, client);
    if (!borrow) throw new Error("Borrow record not found");

    // 2. increase copies
    await client.query("UPDATE books SET copies_available = copies_available + 1 WHERE book_id=$1", [borrow.book_id] );
    await client.query("COMMIT");
    res.json({ message: "Book returned", borrow });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
};