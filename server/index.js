const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;
// middleware
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://book-store-gilt-seven.vercel.app",
//       "https://book-store-ylxg.vercel.app",
//     ],
//     credentials: true,
//   })
// );
const allowedOrigins = [
  "http://localhost:5173",
  "https://book-store-gilt-seven.vercel.app",
  "https://book-store-ylxg.vercel.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());

// routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");
const revenueRoutes = require("./src/stats/revenue.stats");
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/revenue", revenueRoutes);

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.get("/", cors(), (req, res) => {
    res.send("Hello World !");
  });

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main()
  .then(() => console.log("mongo connect success"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
