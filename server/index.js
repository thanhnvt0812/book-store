const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;
// middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://book-store-x5bc-okliq0ffs-thanhs-projects-7d9c1de4.vercel.app",
    ],
    credentials: true,
  })
);

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
// Sử dụng middleware CORS ngay từ đầu trước khi khai báo các route khác
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://book-store-nu-drab.vercel.app"
  ); // Domain client trên Vercel
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json()); // Đảm bảo có middleware xử lý JSON

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.get("/", (req, res) => {
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
