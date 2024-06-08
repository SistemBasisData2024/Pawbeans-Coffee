const express = require('express');
const {addToCart, removeFromCart, removeCartById, getCart} = require('../controllers/cartController');

const cartRouter = express.Router();

cartRouter.get('/get-cart', getCart);
cartRouter.post('/add-cart', addToCart);
cartRouter.post('/remove-cart', removeFromCart);
cartRouter.post('/remove-cart-by-id', removeCartById);

module.exports = cartRouter;