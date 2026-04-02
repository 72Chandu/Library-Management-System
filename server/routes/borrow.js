const express = require("express");
const router = express.Router();
const {borrowBook,returnBook,} = require("../controllers/borrow");

// Protected routes
router.post("/",borrowBook);
router.post("/return",returnBook);

module.exports = router;