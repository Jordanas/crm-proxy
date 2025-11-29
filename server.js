// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// Middleware
app.use(cors({ origin: "*" })); // leidžia visiems domenams, gali pakeisti į savo svetainę
app.use(express.json());

// POST /recommend proxy į n8n webhook
app.post("/recommend", async (req, res) => {
  try {
    const n8nResponse = await fetch(
      "https://n8n-izou.sliplane.app/webhook/crm-form-recommend",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    if (!n8nResponse.ok) {
      const text = await n8nResponse.text();
      return res.status(n8nResponse.status).json({
        error: `n8n returned ${n8nResponse.status}`,
        body: text,
      });
    }

    const data = await n8nResponse.json();
    res.json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Healthcheck endpoint, kad serveris veiktų ir "/" GET
app.get("/", (req, res) => {
  res.send("CRM Proxy is running!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
