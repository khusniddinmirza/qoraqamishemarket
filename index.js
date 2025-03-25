require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

// Логируем входящие запросы
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Подключение к MongoDB
if (!MONGO_URI) {
  console.error("MONGO_URI is not set! Check your environment variables.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Определяем маршруты
app.get("/products", (req, res) => {
  console.log("GET /products called");
  res.json([{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }]);
});

// Обработчик для 404 ошибок
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});