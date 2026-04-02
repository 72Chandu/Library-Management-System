const express = require("express");
const router = express.Router();

const {createUser,getUsers,getUser,deleteUser,signup,login} = require("../controllers/user");
const authMiddleware = require("../middleware/auth");

// Routes
router.post("/create", createUser);
router.get("/get", getUsers);
router.get("/get/:id", getUser);
router.delete("/delete/:id", deleteUser);

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;