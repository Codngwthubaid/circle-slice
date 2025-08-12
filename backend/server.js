import express from "express";
import cors from "cors";
import { config } from "dotenv";
import paymentRoutes from "./routes/paymentRoutes";

config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://circle-slice.vercel.app",
    credentials: true,
  })
);
app.use(json());

// Routes
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
