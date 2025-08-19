import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paymentRoutes from "./routes/payment.route.js";


dotenv.config();

const app = express();
app.use(
  cors({
    // origin: process.env.FRONTEND_URL || "https://circle-slice.vercel.app",
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});