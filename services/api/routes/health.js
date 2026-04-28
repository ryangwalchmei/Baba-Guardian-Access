import { Router } from "express";
const health = Router();

health.get("/baba/health", (req, res) => {
  res.status(200).json({
    status: "online",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
  });
});

export default health;
