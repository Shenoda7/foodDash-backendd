const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// }); // because we are already hosting on vercel ,remove comments if you wanna test on your localhost

module.exports = app;
