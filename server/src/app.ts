import express from "express";
import cors from "cors";
import feedRoutes from "./routes/feedRoutes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/feed", feedRoutes);

app.get("/", (_req, res) => {
  res.send("API Running...");
});

export default app;