const express = require('express');
const router = express.Router();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDItoxpTFL9BDk-RJwUOOTxc6UFY749XCs");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });   

router.get('/', (req, res) => {

    console.log("Resetting chat");  
});
// API endpoint for chat
router.post('/', async (req, res) => {
    try {
        const userMessage = req.body.message;
        console.log(userMessage);
        let result = await chat.sendMessage(userMessage);
        console.log(result.response.text());
        res.json({ response: result.response.text() });

      } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
      }
});

module.exports = router;
