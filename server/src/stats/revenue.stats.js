const mongoose = require("mongoose");
const express = require("express");
const Order = require("../orders/order.model");
const Book = require("../books/book.models");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const today = new Date();
    const last7Days = [];

    // Tạo mảng chứa 7 ngày gần nhất (định dạng YYYY-MM-DD)
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      last7Days.push(date.toISOString().split("T")[0]); // Lấy YYYY-MM-DD
    }

    // Truy vấn doanh thu theo ngày
    const revenueData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(last7Days[0]) }, // Lọc đơn hàng từ ngày đầu tiên trong danh sách
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Nhóm theo ngày
          totalRevenue: { $sum: "$totalPrice" }, // Tính tổng doanh thu mỗi ngày
        },
      },
      { $sort: { _id: 1 } }, // Sắp xếp theo ngày tăng dần
    ]);

    // Tạo dữ liệu doanh thu 7 ngày qua, nếu ngày nào không có thì mặc định là 0
    const formattedRevenue = last7Days.map((date) => {
      const dayRevenue = revenueData.find((d) => d._id === date);
      return dayRevenue ? dayRevenue.totalRevenue : 0;
    });

    res.status(200).json({
      labels: last7Days,
      revenueData: formattedRevenue,
    });
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    res.status(500).json({ message: "Failed to fetch revenue data" });
  }
});
module.exports = router;
