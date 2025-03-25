const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Получить все продукты
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

module.exports = router;