const Conversation = require ('../models/Conversation.js');

 async function startConversation(req, res) {
    try {
        // Ensure that the endUserId is provided when starting a conversation
        if (!req.body.endUserId) {
            return res.status(400).json({ error: "endUserId must be provided." });
        }
        console.log(req.body);
        const conversation = await Conversation.create({
            ...req.body,
            chatbotId: req.params.chatbotId,
            status: 'ongoing'  // Default status when a conversation starts
        });
        res.status(201).json(conversation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

 async function listConversations(req, res) {
    try {
        const conversations = await Conversation.findAll({
            where: { chatbotId: req.params.chatbotId },
            include: 'participant'  // Include the related EndUser (alias 'participant' from the model)
        });
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function retrieveConversation(req, res) {
    try {
        const conversation = await Conversation.findByPk(req.params.conversationId, {
            include: 'participant'  // Include the related EndUser
        });
        if (conversation) {
            res.status(200).json(conversation);
        } else {
            res.status(404).json({ error: 'Conversation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateConversation(req, res) {
    try {
        const conversation = await Conversation.findByPk(req.params.conversationId, {
            include: 'participant'
        });        
        
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        // Check if the conversation is already marked as complete
        if (conversation.status === 'completed') {
            return res.status(400).json({ error: 'Cannot modify a completed conversation' });
        }

        const [updated] = await Conversation.update(req.body, {
            where: { id: req.params.conversationId }
        });

        if (updated) {
            const updatedConversation = await Conversation.findByPk(req.params.conversationId);
            res.status(200).json(updatedConversation);
        } else {
            res.status(404).json({ error: 'Conversation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function deleteConversation(req, res) {
    try {
        const deleted = await Conversation.destroy({
            where: { id: req.params.conversationId }
        });
        if (deleted) {
            res.status(204).send("Conversation deleted");
        } else {
            res.status(404).json({ error: 'Conversation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function completeConversation(req, res) {
    try {
        const conversation = await Conversation.findByPk(req.params.conversationId);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        conversation.status = 'completed';
        await conversation.save();

        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports= {
    startConversation,
    listConversations,
    retrieveConversation,
    updateConversation,
    deleteConversation,
    completeConversation
}
