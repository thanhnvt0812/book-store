const express = require("express");
const { createAOrder, getOrderByEmail } = require("./order.controller");

const router = express.Router();

//create order endpoint
router.post("/", createAOrder);
//get order by user email
router.post("/email/:email", getOrderByEmail);
module.exports = router;
