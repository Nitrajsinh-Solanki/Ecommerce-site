const express = require('express');
const { register, login, logAnonymousUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/anonymous', logAnonymousUser);

module.exports = router;
