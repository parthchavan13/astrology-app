// backend/routes/chatRoutes.js
import express from "express";
import ChatSession from "../models/chat.js";

const router = express.Router();

/* ========================================
   1️⃣ START CHAT (User triggers chat start)
======================================== */
router.post("/start", async (req, res) => {
  try {
    const { userId, panditId } = req.body;

    if (!userId || !panditId) {
      return res.status(400).json({ success: false, message: "Missing IDs" });
    }

    // ✅ Generate unique room ID
    const roomId = `user_${userId}_pandit_${panditId}`;

    // Check if chat already exists
    let session = await ChatSession.findOne({ roomId });

    if (!session) {
      // create new session
      session = await ChatSession.create({
        userId,
        panditId,
        roomId,
        isActive: false,
        messages: [],
      });
      console.log("🆕 Created new chat session:", session._id);
    } else {
      console.log("♻️ Reused existing chat session:", session._id);
    }

    return res.status(200).json({
      success: true,
      roomId,
      session,
      message: "Chat session ready",
    });
  } catch (error) {
    console.error("❌ Error starting chat:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ========================================
   2️⃣ PANDIT JOINS CHAT
======================================== */
router.post("/join", async (req, res) => {
  try {
    const { panditId, roomId } = req.body;

    if (!panditId || !roomId) {
      return res.status(400).json({ success: false, message: "Missing data" });
    }

    const session = await ChatSession.findOneAndUpdate(
      { panditId, roomId },
      { isActive: true },
      { new: true }
    );

    if (!session)
      return res.status(404).json({ success: false, message: "Chat not found" });

    console.log(`🟠 Pandit ${panditId} joined room ${roomId}`);

    res.status(200).json({
      success: true,
      session,
      message: "Chat activated successfully",
    });
  } catch (err) {
    console.error("❌ Error joining chat:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ========================================
   3️⃣ GET CHAT HISTORY (User or Pandit)
======================================== */
router.get("/history/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;

    const session = await ChatSession.findOne({ roomId });

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Chat session not found" });
    }

    res.status(200).json({
      success: true,
      roomId,
      messages: session.messages || [],
    });
  } catch (err) {
    console.error("❌ Error fetching chat history:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
