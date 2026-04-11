const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const multer = require("multer");

const authRoutes = require("./routes/auth");
const msgRoutes = require("./routes/messages");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ================= FILE UPLOAD SETUP =================

// Storage config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Upload route
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json("No file uploaded");
    }

    res.json({ file: req.file.filename });
  } catch (err) {
    console.log(err);
    res.status(500).json("Upload failed");
  }
});

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/messages", msgRoutes);

// ================= MONGODB =================
mongoose.connect(
  "mongodb://katipallisruthika:Sruthika%4011@ac-0d7jpda-shard-00-00.a3dgji9.mongodb.net:27017,ac-0d7jpda-shard-00-01.a3dgji9.mongodb.net:27017,ac-0d7jpda-shard-00-02.a3dgji9.mongodb.net:27017/chatapp?ssl=true&replicaSet=atlas-puw9j8-shard-0&authSource=admin&retryWrites=true&w=majority"
)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// ================= SOCKET.IO =================
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("sendMessage", (data) => {
    try {
      io.to(data.room).emit("receiveMessage", data);
    } catch (err) {
      console.log("Socket error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("userOnline", (username) => {
    onlineUsers.push(username);
    io.emit("onlineUsers", onlineUsers);
  });

  socket.on("disconnect", () => {
    onlineUsers = [];
    io.emit("onlineUsers", onlineUsers);
  });
});

// ================= SERVER =================
server.listen(5000, () => {
  console.log("Server running on port 5000");
});