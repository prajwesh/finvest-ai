import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as z from "zod";
import { insertChatMessageSchema } from "@shared/schema";
// We'll use our own utility function to handle ZodError
// import { ValidationError } from "zod-validation-error";

// Gemini API integration
import { GoogleGenerativeAI } from "@google/generative-ai";

// Use Gemini API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY"; 
const genAI = new GoogleGenerativeAI(API_KEY);

const defaultSystemPrompt = `
You are FinvestAI, a financial assistant specializing in helping Indian investors. Your task is to provide 
educational content about investing in India, help users discover suitable investment products, and improve 
their financial literacy. Always provide information specific to the Indian market and regulations.

When discussing investment products like mutual funds, always mention:
1. The category (large cap, mid cap, etc.)
2. Risk level
3. Historical returns (if available)
4. Minimum investment amount
5. Key benefits and considerations

When explaining financial concepts, be clear, concise, and avoid jargon. If you must use financial terms, 
explain them clearly.

Important note: Always clarify that you're providing educational information, not personalized financial advice. 
Recommend that users consult with a certified financial advisor before making investment decisions.
`;

// Helper function to generate AI response
async function generateAIResponse(messages: { role: string, content: string }[]): Promise<string> {
  try {
    // For safety, use a timeout
    const timeoutPromise = new Promise<string>((_, reject) => {
      setTimeout(() => reject(new Error("Request to Gemini API timed out")), 30000);
    });

    const responsePromise = new Promise<string>(async (resolve) => {
      try {
        // Updated to use the correct model name for the current API version
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        
        // Simplified approach for chat history
        let prompt = defaultSystemPrompt + "\n\nConversation history:\n";
        
        // Add conversation history to the prompt
        messages.forEach(msg => {
          prompt += `\n${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}\n`;
        });
        
        // Generate content directly instead of using chat interface
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        resolve(text);
      } catch (error) {
        console.error("Error generating AI response:", error);
        resolve("I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.");
      }
    });

    return Promise.race([responsePromise, timeoutPromise]);
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy" });
  });
  
  // Get all mutual funds
  app.get("/api/mutual-funds", async (req, res) => {
    try {
      const funds = await storage.getAllMutualFunds();
      res.json(funds);
    } catch (error) {
      console.error("Error fetching mutual funds:", error);
      res.status(500).json({ message: "Failed to fetch mutual funds" });
    }
  });
  
  // Get mutual fund by ID
  app.get("/api/mutual-funds/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid mutual fund ID" });
      }
      
      const fund = await storage.getMutualFundById(id);
      if (!fund) {
        return res.status(404).json({ message: "Mutual fund not found" });
      }
      
      res.json(fund);
    } catch (error) {
      console.error("Error fetching mutual fund:", error);
      res.status(500).json({ message: "Failed to fetch mutual fund" });
    }
  });
  
  // Get mutual funds by category
  app.get("/api/mutual-funds/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const funds = await storage.getMutualFundsByCategory(category);
      res.json(funds);
    } catch (error) {
      console.error("Error fetching mutual funds by category:", error);
      res.status(500).json({ message: "Failed to fetch mutual funds" });
    }
  });
  
  // Get all glossary terms
  app.get("/api/glossary", async (req, res) => {
    try {
      const terms = await storage.getAllGlossaryTerms();
      res.json(terms);
    } catch (error) {
      console.error("Error fetching glossary terms:", error);
      res.status(500).json({ message: "Failed to fetch glossary terms" });
    }
  });
  
  // Get glossary term by name
  app.get("/api/glossary/:term", async (req, res) => {
    try {
      const term = req.params.term;
      const glossaryTerm = await storage.getGlossaryTermByTerm(term);
      
      if (!glossaryTerm) {
        return res.status(404).json({ message: "Glossary term not found" });
      }
      
      res.json(glossaryTerm);
    } catch (error) {
      console.error("Error fetching glossary term:", error);
      res.status(500).json({ message: "Failed to fetch glossary term" });
    }
  });
  
  // Chat with AI
  app.post("/api/chat", async (req, res) => {
    try {
      const bodySchema = z.object({
        message: z.string().min(1),
        conversation: z.array(z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string()
        })).optional()
      });
      
      const validatedData = bodySchema.parse(req.body);
      const { message, conversation = [] } = validatedData;
      
      // Add user message to conversation history
      const updatedConversation = [
        ...conversation,
        { role: "user", content: message }
      ];
      
      // Generate AI response
      const aiResponse = await generateAIResponse(updatedConversation);
      
      // Add AI response to conversation history
      updatedConversation.push({ role: "assistant", content: aiResponse });
      
      res.json({
        response: aiResponse,
        conversation: updatedConversation
      });
    } catch (error) {
      console.error("Error processing chat:", error);
      
      if (error instanceof z.ZodError) {
        // Handle ZodError directly without ValidationError
        return res.status(400).json({ 
          message: "Validation error",
          errors: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message
          }))
        });
      }
      
      res.status(500).json({ message: "Failed to process chat" });
    }
  });

  // Create HTTP server without WebSocket functionality
  console.log("WebSockets disabled for better Replit compatibility");
  const httpServer = createServer(app);
  
  return httpServer;
}
