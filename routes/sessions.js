import express from "express";
import Session from "../models/Session.js";

const router = express.Router();

// Create a new session
router.post("/", async (req, res) => {
  try {
    const created = await Session.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// List sessions (latest first)
router.get("/", async (req, res) => {
  try {
    const sessions = await Session.find().sort({ date: -1 }).limit(200);
    res.json(sessions);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get one session
router.get("/:id", async (req, res) => {
  try {
    const s = await Session.findById(req.params.id);
    if (!s) return res.status(404).json({ error: "Not found" });
    res.json(s);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Update one session (replace)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Session.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Delete one session
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Session.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
