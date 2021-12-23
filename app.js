import express from "express";
import { getAnissiaSchedule } from "./anissia";
import cors from "cors";
const PORT = 7815;
const app = express();
app.use(cors());
app.get("/schedule/:day", async (req, res) => {
  res.json(await getAnissiaSchedule(req.params.day));
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
