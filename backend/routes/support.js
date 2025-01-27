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

router.get('/',async (req, res) => {
  console.log("page refresh");

  chat = model.startChat({
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

  history = await chat.getHistory();
  console.log(history);

  // chat.startChat({
  //   history: [
  //     {
  //       role: "user",
  //       parts: [{ text: "Hello" }],
  //     },
  //     {
  //       role: "model",
  //       parts: [{ text: "Great to meet you. What would you like to know?" }],
  //     },
  //   ],
  // });

});
// API endpoint for chat
router.post('/', async (req, res) => {
    try {
        const userMessage = req.body.message;
        let result = await chat.sendMessage(userMessage);
        res.json({ response: result.response.text() });

      } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
      }
});

module.exports = router;
