require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json(), (err, req, res, next) => {
  if (err) {
    console.error("JSON Parsing Error:", err);
    return res.status(400).json({ error: "Invalid JSON" });
  }
  next();
});

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

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Определяем маршруты
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// 404 Обработчик
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
