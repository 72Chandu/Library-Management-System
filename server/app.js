const express = require("express");
const app = express();
app.use(express.json());

const userRoutes = require("./routes/user");
const authRoutes = require("./middleware/auth");
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});