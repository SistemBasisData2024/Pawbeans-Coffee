const express = require('express');
const {addToCart, removeFromCart, getCart} = require('../controllers/cartController');

const cartRouter = express.Router();

cartRouter.get('/get', getCart);
cartRouter.post('/add', addToCart);
cartRouter.post('/remove', removeFromCart);

module.exports = cartRouter;