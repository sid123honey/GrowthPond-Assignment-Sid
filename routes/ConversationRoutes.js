const express =  require('express');
const router = express.Router();
const Conversationfun =   require('../controllers/ConversationController.js');



router.post('/chatbots/:chatbotId/conversations', Conversationfun.startConversation);
router.get('/chatbots/:chatbotId/conversations', Conversationfun.listConversations);
router.put('/conversations/:conversationId/complete', Conversationfun.completeConversation);
router.get('/conversations/:conversationId', Conversationfun.retrieveConversation);
router.put('/conversations/:conversationId', Conversationfun.updateConversation);
router.delete('/conversations/:conversationId', Conversationfun.deleteConversation);

module.exports = router;