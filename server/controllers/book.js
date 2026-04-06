const bookModel = require("../models/book");

// Add Book
exports.addBook = async (req, res) => {
  const { title, author, genre, copies_available } = req.body;
  try {
    if (!title || !author || !copies_available) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const book = await bookModel.createBook(title,author,genre,copies_available);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Books
exports.getAllBooks = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 5 } = req.query;
    const books = await bookModel.getAllBooks(search,Number(page), Number(limit));
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Book
exports.getBook = async (req, res) => {
  try {
    const book = await bookModel.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Book
exports.updateBook = async (req, res) => {
  const { title, author, genre, copies_available } = req.body;
  try {
    const book = await bookModel.updateBook(
      req.params.id,title, author,genre,copies_available);
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    await bookModel.deleteBook(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};