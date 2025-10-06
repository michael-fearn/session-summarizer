// src/routes/api.ts
import { Router } from "express";
import { WebSocketServer } from "ws";

const router = Router();

router.get("/status", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});


const wss = new WebSocketServer({
  clientTracking: false,
  path: "/ws/audio",
  port: 3080,
});

wss.on("connection", (ws) => {
  console.log("New WebSocket connection established");
  ws.send("Welcome to the WebSocket server!");
  ws.on("message", (message) => {
    console.log("Received message:", message);
  });

  ws.on("close", (code, reason) => {
    console.log("WebSocket connection closed");
    console.log("Code:", code, "Reason:", reason.toString());
  });
});

wss.on("close", () => {
  console.log("WebSocket connection closed");
});



export default router;
