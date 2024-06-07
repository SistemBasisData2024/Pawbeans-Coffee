const express = require('express');
const {addToCart, removeFromCart, getCart} = require('../controllers/cartController');

const cartRouter = express.Router();

cartRouter.get('/get-cart/:userId', getCart);
cartRouter.post('/add-cart', addToCart);
cartRouter.post('/remove-cart', removeFromCart);

module.exports = cartRouter;