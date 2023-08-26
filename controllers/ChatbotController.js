const Chatbot = require('../models/Chatbot.js');
const { Op } = require('sequelize');

// Create a new chatbot for a user
async function createChatbotForUser(req, res) {
    try {
        const chatbot = await Chatbot.create({ ...req.body, userId: req.params.userId });
        res.status(201).json(chatbot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// List all chatbots for a user
 async function listChatbotsForUser(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const chatbots = await Chatbot.findAll({
            where: { userId: req.params.userId },
            limit,
            offset
        });
        
        const totalChatbots = await Chatbot.count({ where: { userId: req.params.userId } });
        const totalPages = Math.ceil(totalChatbots / limit);
        const currentPage = Math.floor(offset / limit) + 1;

        res.status(200).json({
            chatbots,
            meta: {
                totalChatbots,
                totalPages,
                currentPage,
                limit,
                offset
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Retrieve a single chatbot by its ID
 async function retrieveChatbot(req, res) {
    try {
        const chatbot = await Chatbot.findByPk(req.params.chatbotId);
        if (chatbot) {
            res.status(200).json(chatbot);
        } else {
            res.status(404).json({ error: 'Chatbot not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a chatbot by its ID
async function updateChatbot(req, res) {
    try {
        const [updated] = await Chatbot.update(req.body, {
            where: { id: req.params.chatbotId }
        });
        if (updated) {
            const updatedChatbot = await Chatbot.findByPk(req.params.chatbotId);
            res.status(200).json(updatedChatbot);
        } else {
            res.status(404).json({ error: 'Chatbot not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a chatbot by its ID
 async function deleteChatbot(req, res) {
    try {
        const deleted = await Chatbot.destroy({
            where: { id: req.params.chatbotId }
        });
        if (deleted) {
            res.status(204).send("Chatbot deleted");
        } else {
            res.status(404).json({ error: 'Chatbot not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

 const searchChatbots = async (req, res) => {
    try {
        const query = req.query.q;
        const chatbots = await Chatbot.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    // if you have a 'description' field
                    { description: { [Op.like]: `%${query}%` } }
                ]
            }
        });
        res.status(200).json(chatbots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    createChatbotForUser,
    listChatbotsForUser,
    retrieveChatbot,
    updateChatbot,
    deleteChatbot,
    searchChatbots
}