import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const N8N_WEBHOOK = process.env.N8N_WEBHOOK;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Proxy POST endpointas
app.post("/recommend", async (req, res) => {
  try {
    const response = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// Test GET endpointas
app.get("/", (req, res) => {
  res.sendFile(`${process.cwd()}/public/widget.html`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
