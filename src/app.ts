import express from "express";
import apiRoutes from "./routes";

const app = express();

app.use(express.json());

// API v1 endpoints
app.use("/api/v1", apiRoutes);

export default app;
