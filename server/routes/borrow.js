const express = require("express");
const router = express.Router();
const {borrowBook,returnBook,} = require("../controllers/borrow");
const auth = require("../middleware/auth");
// Protected routes
router.post("/",auth, borrowBook);
router.post("/return",auth, returnBook);

module.exports = router;