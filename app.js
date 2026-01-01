import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import sessionsRouter from "./routes/sessions.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.options("*", cors());

app.use(express.json({ limit: "1mb" }));

const port = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.warn("⚠️  Missing MONGO_URI in .env. Backend will still start, but DB ops will fail.");
} else {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}

app.get("/api/health", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));
app.use("/api/sessions", sessionsRouter);

app.listen(port, () => console.log(`✅ API listening on http://localhost:${port}`));
