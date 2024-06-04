const express = require('express');
const {addNewOrder, updateOrderById, deleteOrderById, updateOrderStatus, getMyOrders} = require('../controllers/myOrderController');

const myOrderRouter = express.Router();

myOrderRouter.post('/addOrder', addNewOrder);
myOrderRouter.put('/updateOrder', updateOrderById);
myOrderRouter.delete('/deleteOrder', deleteOrderById);
myOrderRouter.put('/updateStatus', updateOrderStatus);
myOrderRouter.get('/getMyOrders', getMyOrders);

module.exports = myOrderRouter;
