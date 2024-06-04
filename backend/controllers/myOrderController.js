const pool = require('../db/db');
const bcrypt = require('bcrypt');

const addNewOrder = async (req, res) => {
    try {
        const { user_id, items, amount, address, status, date, payment } = req.body;

        const newOrder = await pool.query(
            'INSERT INTO orders (user_id, items, amount, address, status, date, payment) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [user_id, items, amount, address, status, date, payment]
        );
        res.status(200).json(newOrder.rows[0]);
    } catch (err) {
        console.error(`Error adding new order: ${err.message}`);
        res.status(500).send('Server Error: Error while creating order!');
    }
};

const updateOrderById = async (req, res) => {
    try {
        const { order_id, user_id, items, amount, address, status, date, payment } = req.body;
        const updatingOrder = await pool.query(
            'UPDATE orders SET user_id = $2, items = $3, amount = $4, address = $5, status = $6, date = $7, payment = $8 WHERE order_id = $1 RETURNING *',
            [order_id, user_id, items, amount, address, status, date, payment]
        );
        res.status(200).json(updatingOrder.rows[0]);
    } catch (err) {
        console.error(`Error updating order: ${err.message}`);
        res.status(500).send('Server Error: Error updating order!');
    }
};

const deleteOrderById = async (req, res) => {
    try {
        const { order_id } = req.body;
        const result = await pool.query(
            'DELETE FROM orders WHERE order_id = $1',
            [order_id]
        );

        if (result.rowCount > 0) {
            res.status(200).json({ success: true, message: 'Order deleted successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'No order found with this id.' });
        }
    } catch (err) {
        console.error(`Error deleting order: ${err.message}`);
        res.status(500).send('Server Error: Error deleting order!');
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { order_id, status, payment } = req.body;
        const updateStatus = await pool.query(
            'UPDATE orders SET status = $2, payment = $3 WHERE order_id = $1 RETURNING *',
            [order_id, status, payment]
        );
        res.status(200).json(updateStatus.rows[0]);
    } catch (err) {
        console.error(`Error updating order status: ${err.message}`);
        res.status(500).send('Server Error: Error updating order status!');
    }
};

const getMyOrders = async (req, res) => {
    try {
        const { user_id } = req.body;
        const result = await pool.query(
            'SELECT * FROM orders WHERE user_id = $1',
            [user_id]
        );

        if (result.rows.length > 0) {
            res.status(200).json({ success: true, orders: result.rows });
        } else {
            res.status(404).json({ success: false, message: 'No orders found for this user.' });
        }
    } catch (err) {
        console.error(`Error retrieving orders: ${err.message}`);
        res.status(500).send('Server Error: Error retrieving orders!');
    }
};

module.exports = {
    addNewOrder,
    updateOrderById,
    deleteOrderById,
    updateOrderStatus,
    getMyOrders
};
