//import { create, findAll, findByPk, update, destroy, EndUser } from '../models/EndUser.js';
const EndUser = require('../models/EndUser.js');
const { Op } = require('sequelize');

async function registerEndUser(req, res) {
    try {
        const endUser = await EndUser.create(req.body);
        res.status(201).json(endUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

 async function listEndUsers(req, res) {
    try {
        const endUsers = await EndUser.findAll();
        res.status(200).json(endUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

 async function retrieveEndUser(req, res) {
    try {
        const endUser = await EndUser.findByPk(req.params.endUserId);
        if (endUser) {
            res.status(200).json(endUser);
        } else {
            res.status(404).json({ error: 'EndUser not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

 async function updateEndUser(req, res) {
    try {
        const [updated] = await EndUser.update(req.body, {
            where: { id: req.params.endUserId }
        });
        if (updated) {
            const updatedEndUser = await EndUser.findByPk(req.params.endUserId);
            res.status(200).json(updatedEndUser);
        } else {
            res.status(404).json({ error: 'EndUser not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

 async function deleteEndUser(req, res) {
    try {
        const deleted = await EndUser.destroy({
            where: { id: req.params.endUserId }
        });
        if (deleted) {
            res.status(204).send("EndUser deleted");
        } else {
            res.status(404).json({ error: 'EndUser not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const searchEndUsers = async (req, res) => {
    try {
        const query = req.query.q;
        const endUsers = await EndUser.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { email: { [Op.like]: `%${query}%` } }
                ]
            }
        });
        res.status(200).json(endUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports={
    registerEndUser,
    listEndUsers,
    retrieveEndUser,
    updateEndUser,
    deleteEndUser,
    searchEndUsers

}