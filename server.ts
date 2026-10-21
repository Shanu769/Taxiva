import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Setup
  const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Gemini API key is not configured." });
      }

      const model = "gemini-3-flash-preview";
      const systemInstruction = `You are the Taxiva LLC AI Assistant, a helpful representative of Taxiva LLC, an expert tax firm based in Round Rock, Texas.
      
      Firm Profile & Context:
      - We serve over 6,500+ clients with a focus on trust, precision, and building lasting legacies of wealth.
      - Head Office: Park West Corporate office, 555 Round Rock W Dr e225, Round Rock, TX 78681, USA.
      - Phone: +1 737-381-2330
      - Email: info@taxiva.co
      - WhatsApp: +91 996-3260-743
      - Services: Individual Tax Filing, Business Tax Filing, FBAR & Foreign Reporting, and Indian Tax & NRI Services.
      - Pricing: Our expert tax services start from just $89.
      - Mission: To help "first gen" tech professionals and others build wealth and support their communities.
      
      Lead Collection Protocol:
      - If a user mentions they want to "file taxes", "start filing", or needs a "quote", IMMEDIATELY provide our contact details and ask for theirs, or direct them to our Get Started Google Form (/get-started).
      - Example Response: "I can certainly help you get started with your tax filing! Please reach out to our team at info@taxiva.co or call +1 737-381-2330, or fill out our Get Started form at /get-started. Alternatively, if you provide your email or phone number here, I can have a tax professional contact you shortly."
      
      Tone: Professional, expert, welcoming, and high-integrity.
      
      Security: Never ask for passwords. Direct users to the official links on our Tax Tools page for IRS/State portals.`;

      const chat = ai.chats.create({
        model: model,
        config: {
          systemInstruction: systemInstruction,
        },
        history: history || [],
      });

      const result = await chat.sendMessage({ message });
      res.json({ text: result.text });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat message." });
    }
  });

  app.post("/api/sheets/data", async (req, res) => {
    try {
      const { accessToken, spreadsheetId, range } = req.body;

      if (!accessToken) {
        return res.status(401).json({ error: "Access token is required" });
      }

      if (!spreadsheetId) {
        return res.status(400).json({ error: "Spreadsheet ID is required" });
      }

      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });

      const sheets = google.sheets({ version: "v4", auth });
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: range || "A1:Z100",
      });

      res.json(response.data);
    } catch (error: any) {
      console.error("Sheets API error:", error);
      res.status(error.response?.status || 500).json({ 
        error: "Failed to fetch spreadsheet data",
        message: error.message 
      });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
