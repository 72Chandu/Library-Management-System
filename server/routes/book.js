const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {addBook,getBooks,getBook,updateBook,deleteBook,} = require("../controllers/book");

router.post("/add", auth, admin, addBook);
router.get("/get",auth, getBooks);
router.get("/get/:id", auth, getBook);
router.put("/update/:id", auth, admin, updateBook);
router.delete("/delete/:id", auth, admin, deleteBook);

module.exports = router;