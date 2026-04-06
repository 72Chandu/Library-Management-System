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
  const { borrow_id,book_id } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const check=await client.query(`SELECT * FROM borrowed_books WHERE borrow_id=$1 AND book_id=$2 AND return_date IS NULL`,[borrow_id,book_id]);
    if(check.rowCount===0) throw new Error("No active borrow record found for this book and borrow ID");

    // 1. return book
    const borrow = check.rows[0];
    if (!borrow) throw new Error("Borrow record not found");

    const updated = await client.query(`UPDATE borrowed_books SET return_date = CURRENT_DATE WHERE borrow_id = $1 RETURNING *`,[borrow_id]);

    // 2. increase copies
    await client.query("UPDATE books SET copies_available = copies_available + 1 WHERE book_id=$1", [borrow.book_id] );
    await client.query("COMMIT");
    res.json({ message: "Book returned", data:updated.rows[0], });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
};

// GET OVERDUE BOOKS
exports.getOverdueBooks = async (req, res) => {
  try {
    const overdueBooks = await borrowModel.getOverdueBooks();
    const result = overdueBooks.map((item) => {
      const fine = borrowModel.calculateFine(item.due_date);
      return {...item,fine};
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USER BORROWED BOOKS
exports.getBorrowedBooks = async (req, res) => {
  const user_id = req.user.user_id;
  try {
    const books = await borrowModel.getUserBorrowedBooks(user_id);
    res.json(books);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getBorrowedUsersGrouped = async (req, res) => {
  try {
    const rows = await borrowModel.getBorrowedGrouped();
    const grouped = {};
    rows.forEach((row) => {
      const userId = row.user_id;
      const fine = borrowModel.calculateFine(row.due_date);

      if (!grouped[userId]) {
        grouped[userId] = {
          user_id: userId,
          name: row.name,
          books: [],
        };
      }

      grouped[userId].books.push({
        title: row.title,
        author: row.author,
        borrow_date: row.borrow_date,
        due_date: row.due_date,
        fine,
      });
    });
    res.json(Object.values(grouped));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};