const express = require("express");
const router = express.Router();

const {getUsers,getUser,deleteUser,signup,login} = require("../controllers/user");
const auth = require("../middleware/auth");

// Routes
router.get("/get",auth, getUsers);
router.get("/get/:id", auth, getUser);
router.delete("/delete/:id", auth, deleteUser);

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;