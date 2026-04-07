const express = require("express");
const router = express.Router();

const {getUsers,getUser,deleteUser,signup,login,logout,toggleBlockUser} = require("../controllers/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Routes
router.get("/get",auth, getUsers);
router.get("/get/:id", auth, getUser);
router.delete("/delete/:id", auth, admin, deleteUser);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", auth,logout);
router.put("/block/:user_id", auth, admin, toggleBlockUser);

module.exports = router;