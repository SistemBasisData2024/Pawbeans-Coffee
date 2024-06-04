const express = require('express');
const {signup,login,toggleAnonymous} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/toggleAnonymous', toggleAnonymous);

module.exports = router;
