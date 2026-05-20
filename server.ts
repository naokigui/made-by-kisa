import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let __filenameVar = "";
let __dirnameVar = "";

try {
  __filenameVar = __filename;
  __dirnameVar = __dirname;
} catch (e) {
  __filenameVar = fileURLToPath(import.meta.url);
  __dirnameVar = path.dirname(__filenameVar);
}

const _resolvedFilename = __filenameVar;
const _resolvedDirname = __dirnameVar;

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

  // API Route: Contact Response Mock/Smart
  app.post("/api/contact", async (req, res) => {
    const { name, message } = req.body;
    
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.json({ 
          success: true, 
          reply: `Obrigado, ${name}! Recebemos sua mensagem e entraremos em contato em breve.` 
        });
      }

      const prompt = `Você é o assistente virtual da marca "Made by Kisa", uma boutique de produtos artesanais. 
      Um cliente chamado "${name}" enviou a seguinte mensagem: "${message}".
      Responda de forma curta, calorosa e profissional, agradecendo o contato e confirmando que a equipe retornará em breve. 
      A resposta deve ser em português.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      res.json({ 
        success: true, 
        reply: response.text || `Obrigado, ${name}! Recebemos sua mensagem.` 
      });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });

  // Vite integration
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
