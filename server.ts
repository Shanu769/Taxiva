import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.NODE_ENV === "production" && process.env.PORT ? Number(process.env.PORT) : 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Gemini API key is not configured." });
      }

      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const model = "gemini-3.8-flash";
      const systemInstruction = `You are the TaxBeam LLC AI Assistant, an expert tax professional for TaxBeam LLC based in New York, NY (EST).
      
      Firm Profile & Context:
      - We serve clients nationwide across all 50 states and international expats/NRIs with precision, integrity, and proactive tax strategy.
      - Head Office: One World Trade Center, Suite 8500, New York, NY 10007, USA.
      - Phone: +1 737-381-2330
      - Email: info@taxbeam.co
      - WhatsApp: +91 996-3260-743
      - Services: Individual Tax Filing (Form 1040), Business Tax Filing (1120, 1120-S, 1065, LLC), FBAR & Foreign Reporting (FinCEN 114, Form 8938), and Indian Tax & NRI Services (ITR, DTAA).
      - Pricing: Expert tax filing services start from just $89.
      - Mission: To help individuals, founders, tech professionals, and businesses optimize their taxes and remain fully compliant.
      
      Google Search Grounding:
      - You have real-time Google Search grounding enabled via the googleSearch tool.
      - ALWAYS leverage up-to-date search data when answering questions regarding current tax laws, standard deductions, tax brackets, filing deadlines, IRS notices, EV clean vehicle credits, FBAR/FATCA thresholds, or state tax rates.
      - Provide accurate numbers, dates, and IRS publication references whenever relevant.
      
      Lead Collection Protocol:
      - If a user mentions they want to "file taxes", "start filing", or needs a "quote", IMMEDIATELY provide our contact details and ask for theirs, or direct them to our Get Started form (/get-started).
      - Example: "I can certainly help you get started with your tax filing! Please reach out to our team at info@taxbeam.co or call +1 737-381-2330, or fill out our Get Started form at /get-started. Alternatively, if you share your email or phone number here, a licensed tax advisor will contact you shortly."
      
      Tone: Professional, expert, welcoming, authoritative, and high-integrity.
      Security: Never ask for passwords or full SSNs. Direct users to the official links on our Tax Tools page for IRS/State portals.`;

      // Build contents array for multi-turn generateContent
      const contents: any[] = [];
      if (Array.isArray(history)) {
        for (const item of history) {
          if (item?.role && item?.parts?.length) {
            contents.push({
              role: item.role === "assistant" || item.role === "model" ? "model" : "user",
              parts: item.parts.map((p: any) => ({ text: p.text || "" })),
            });
          }
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: model,
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          tools: [{ googleSearch: {} }],
        },
      });

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const webSearchQueries = response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];

      const sources = groundingChunks
        .map((chunk: any) => chunk?.web)
        .filter((web: any) => Boolean(web?.uri))
        .map((web: any) => ({
          title: web.title || web.uri,
          uri: web.uri,
        }));

      // Deduplicate sources by URI
      const uniqueSources = Array.from(
        new Map(sources.map((s: any) => [s.uri, s])).values()
      );

      res.json({
        text: response.text || "",
        sources: uniqueSources,
        searchQueries: webSearchQueries,
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat message." });
    }
  });

  // Dedicated Grounded Tax Research API endpoint
  app.post("/api/tax-research", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Search query is required." });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Gemini API key is not configured." });
      }

      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `You are an expert tax research analyst for TaxBeam LLC. Use real-time Google Search data to provide accurate, up-to-date, and authoritative tax guidance for the following inquiry:

"${query}"

Instructions:
1. Provide a direct, well-structured explanation using current IRS, Treasury, or state tax regulations.
2. Include specific tax brackets, standard deductions, dollar thresholds, eligibility limits, or deadlines if applicable.
3. Structure your response clearly with headings or bullet points where appropriate.
4. Conclude with a brief reminder that TaxBeam LLC CPAs can review individual or business tax documents for personalized optimization.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const webSearchQueries = response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];

      const sources = groundingChunks
        .map((chunk: any) => chunk?.web)
        .filter((web: any) => Boolean(web?.uri))
        .map((web: any) => ({
          title: web.title || web.uri,
          uri: web.uri,
        }));

      const uniqueSources = Array.from(
        new Map(sources.map((s: any) => [s.uri, s])).values()
      );

      res.json({
        answer: response.text || "",
        sources: uniqueSources,
        searchQueries: webSearchQueries,
      });
    } catch (error) {
      console.error("Tax research error:", error);
      res.status(500).json({ error: "Failed to perform grounded tax research." });
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
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");

    // Serve hashed assets and static files with fine-grained caching headers
    app.use(
      express.static(distPath, {
        index: false, // Prevent serving index.html automatically without cache-control headers
        setHeaders: (res, filePath) => {
          if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, proxy-revalidate, max-age=0");
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Expires", "0");
          } else if (filePath.includes("/assets/")) {
            // Hashed bundle files can be cached long-term
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          } else {
            res.setHeader("Cache-Control", "public, max-age=86400");
          }
        },
      })
    );

    // Root and SPA catch-all route for index.html with strict NO-CACHE headers so published updates reflect immediately
    app.get("*", (req, res) => {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, proxy-revalidate, max-age=0");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });

  server.on("error", (err: any) => {
    console.error("Server listen error:", err);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
