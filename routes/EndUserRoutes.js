const express =  require('express');
const router = express.Router();
const EndUserfun = require('../controllers/EndUserController.js');



router.post('/endusers', EndUserfun.registerEndUser);
router.get('/endusers', EndUserfun.listEndUsers);
router.get('/endusers/search', EndUserfun.searchEndUsers);
router.get('/endusers/:endUserId', EndUserfun.retrieveEndUser);
router.put('/endusers/:endUserId', EndUserfun.updateEndUser);
router.delete('/endusers/:endUserId', EndUserfun.deleteEndUser);

module.exports = router;