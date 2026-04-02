const express = require("express");
const app = express();
app.use(express.json());

const userRoutes = require("./routes/user");
const authRoutes = require("./middleware/auth");
const bookRoutes = require("./routes/book");

app.use("/api/books", bookRoutes);
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});