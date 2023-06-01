import express from "express";
import bodyParser from "body-parser";
import monkeysRoutes from "./routes/monkeys.js";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const PORT = 5000;

mongoose.connect(process.env.URL);
const db = mongoose.connection;
app.use(bodyParser.json());

// anything in monkey routes goes after /monkeys

app.use("/monkeys", monkeysRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
