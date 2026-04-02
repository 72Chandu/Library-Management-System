const express = require("express");
const router = express.Router();

const {createUser,getUsers,getUser,deleteUser,signup,login} = require("../controllers/user");
const authMiddleware = require("../middleware/auth");

// Routes
router.post("/create",authMiddleware, createUser);
router.get("/get", getUsers);
router.get("/get/:id", getUser);
router.delete("/delete/:id",authMiddleware, deleteUser);
router.post("/signup", signup);
router.post("/login", authMiddleware, login);

module.exports = router;