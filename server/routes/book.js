const express = require("express");
const router = express.Router();

const {addBook,getBooks,getBook,updateBook,deleteBook,} = require("../controllers/book");

router.post("add/", addBook);
router.get("get/", getBooks);
router.get("get/:id", getBook);
router.put("update/:id", updateBook);
router.delete("delete/:id", deleteBook);

module.exports = router;