const express =  require('express');
const router = express.Router();
const Chatbotfun = require('../controllers/ChatbotController.js');



router.post('/users/:userId/chatbots', Chatbotfun.createChatbotForUser);
router.get('/users/:userId/chatbots', Chatbotfun.listChatbotsForUser);
router.get('/chatbots/search', Chatbotfun.searchChatbots);
router.get('/chatbots/:chatbotId', Chatbotfun.retrieveChatbot);
router.put('/chatbots/:chatbotId', Chatbotfun.updateChatbot);
router.delete('/chatbots/:chatbotId', Chatbotfun.deleteChatbot);

module.exports = router;