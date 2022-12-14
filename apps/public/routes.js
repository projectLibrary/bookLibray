const express = require('express');
const accounts = require('./controllers/accountsController');

const router = express.Router();
router.post('/register', accounts.register);
router.post('/login', accounts.login);

module.exports = router;