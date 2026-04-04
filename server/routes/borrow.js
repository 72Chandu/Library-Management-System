const express = require("express");
const router = express.Router();
const {borrowBook,returnBook,getOverdueBooks} = require("../controllers/borrow");
const auth = require("../middleware/auth");
const admin= require("../middleware/admin");
// Protected routes
router.post("/",auth, borrowBook);
router.post("/return",auth, returnBook);
router.get("/overdue", auth, admin, getOverdueBooks)
module.exports = router;