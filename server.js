import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/error.middleware.js';
import authRouter from './routes/auth.routes.js';
import complaintRouter from './routes/complaint.routes.js';
import messageRouter from './routes/message.route.js';
import conversationRouter from './routes/conversation.route.js';

dotenv.config();
const PORT = process.env.PORT || 7000;
const CLIENT = process.env.CLIENT_URL || "http://localhost:8080";

const app = express();
app.use(cors({ origin: ['http://localhost:8080',"http://localhost:8081","http://localhost:5173",CLIENT], credentials: true }));
app.use(express.json());
app.use(cookieParser());

// HTTP + Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: CLIENT, methods: ["GET", "POST"] },
});
app.set("socketio", io);

io.on("connection", (socket) => {
    console.log("✅ socket connected:", socket.id);
    socket.on("join", (conversationId) => {
        if (conversationId) socket.join(conversationId);
    });
    socket.on("disconnect", () => console.log("❌ socket disconnected:", socket.id));
});

// REST routes
app.use("/api/auth", authRouter);
app.use("/api/complaints", complaintRouter);
app.use("/api/messages", messageRouter);
app.use("/api/conversations", conversationRouter);

// IMPORTANT: Error handling middleware should be placed at the end, after all routes.
app.use(notFound);
app.use(errorHandler);

// Start server
httpServer.listen(PORT, () => {
    console.log(`🚀 Server with WebSockets is running on port ${PORT}`);
    connectDB();
});