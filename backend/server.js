import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "./models/Admin.js";
import ChatSession from "./models/chat.js"

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import panditRoutes from "./routes/panditRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/pandit", panditRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("AstroWeb Backend running successfully 🌠");
});

app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Username and password required" });

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: { id: admin._id, username: admin.username },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

const activeRooms = {}; // { roomId: { user: false, pandit: false } }

io.on("connection", (socket) => {
  console.log(`🟢 Client connected: ${socket.id}`);

  socket.on("join_room", ({ roomId, role }) => {
    try {
      socket.join(roomId);
      console.log(`📥 ${role} joined room: ${roomId}`);

      if (!activeRooms[roomId]) {
        activeRooms[roomId] = { user: false, pandit: false };
      }

      if (role === "user" || role === "pandit") {
        activeRooms[roomId][role] = true;
      }

      io.to(roomId).emit("participant_joined", { role, roomId });

      if (activeRooms[roomId].user && activeRooms[roomId].pandit) {
        io.to(roomId).emit("chat_ready", { roomId });
        console.log(`✅ Room ${roomId} is ready for chat`);
      }
    } catch (err) {
      console.error("join_room error:", err);
    }
  });

  socket.on("send_message", async (data) => {
    /*
      expected data shape (recommended):
      {
        roomId: "room_userid_panditid",
        userId: "<ObjectId or string>",
        panditId: "<ObjectId or string>",
        sender: "<userId or panditId or displayName>",
        message: "Hello..."
      }
    */
    try {
      if (!data || !data.roomId || !data.message) {
        console.warn("send_message missing required fields:", data);
        return;
      }

      let chatSession = await ChatSession.findOne({ roomId: data.roomId });

      if (!chatSession) {
        chatSession = await ChatSession.create({
          userId: data.userId || null,
          panditId: data.panditId || null,
          roomId: data.roomId,
          isActive: true,
          messages: [],
        });
      }

      const messageObj = {
        sender: data.sender || String(data.senderId || "unknown"),
        text: data.message,
        time: new Date(),
      };

      chatSession.messages.push(messageObj);
      await chatSession.save();

      io.to(data.roomId).emit("receive_message", {
        roomId: data.roomId,
        sender: messageObj.sender,
        message: messageObj.text,
        time: messageObj.time,
        sessionId: chatSession._id,
      });
    } catch (err) {
      console.error("Error in send_message:", err);
    }
  });

  socket.on("typing", ({ roomId, sender }) => {
    try {
      if (!roomId) return;
      socket.to(roomId).emit("typing", { sender });
    } catch (err) {
      console.error("typing event error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
