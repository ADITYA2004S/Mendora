require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "../frontend")));
app.use(cors());
app.use(express.json());

// Google Gemini API Configuration
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Serve Static Pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/chat.html"));
});
app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/user.html"));
});
app.get("/user-page.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/user.html"));
});
app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/user.html"));
});
app.get("/resources", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/resources.html"));
});
app.get("/resource", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/resources.html"));
});

// Chatbot API Endpoint
app.post("/chat", async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Use the correct model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Set up proper content structure
    const prompt = {
      contents: [{ role: "user", parts: [{ text: message }] }],
    };

    // Make API call
    const result = await model.generateContent(prompt);

    // Log the entire response for debugging
    console.log("Full API Response:", JSON.stringify(result, null, 2));

    // Extract response text with proper error handling
    let responseText = "No response generated";

    if (result && result.response) {
      responseText = result.response.text();
    } else if (
      result &&
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      responseText = result.candidates[0].content.parts[0].text;
    }

    console.log("Extracted Response:", responseText);
    res.json({ reply: responseText });
  } catch (error) {
    console.error("Chatbot API Error:", error.message);
    console.error("Error Stack:", error.stack);

    // Return a more informative error message
    res.status(500).json({
      error: "API request failed",
      details: error.message,
      hint: "Check console logs for full details",
    });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
