const express = require('express');
const {addToCart, removeFromCart, removeCartById, getCartByUserId, getUserCart} = require('../controllers/cartController');

const cartRouter = express.Router();

cartRouter.get('/get-cart/:user_id', getCartByUserId);
cartRouter.get('/user-cart', getUserCart);
cartRouter.post('/add-cart', addToCart);
cartRouter.post('/remove-cart', removeFromCart);
cartRouter.post('/remove-cart-by-id', removeCartById);

module.exports = cartRouter;