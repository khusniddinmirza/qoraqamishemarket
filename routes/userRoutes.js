const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Получить всех пользователей
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

module.exports = router;