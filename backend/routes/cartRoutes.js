const express = require('express');
const {addToCart, removeFromCart, removeCartById, getCartByUserId, getUserCart, deleteFromCart} = require('../controllers/cartController');

const cartRouter = express.Router();

cartRouter.get('/get-cart/:user_id', getCartByUserId);
cartRouter.get('/user-cart/:user_id', getUserCart);
cartRouter.post('/add-cart', addToCart);
cartRouter.post('/remove-cart', removeFromCart);
cartRouter.post('/remove-cart-by-id', removeCartById);
cartRouter.delete('/delete-cart', deleteFromCart);

module.exports = cartRouter;