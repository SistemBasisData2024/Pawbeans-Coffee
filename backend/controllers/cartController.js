const pool = require('../db/db');

const addToCart = async (req, res) => {
    try {
        const { user_id, coffee_id } = req.body;
        await pool.query(
            `INSERT INTO cart_items (user_id, coffee_id, quantity)
             VALUES ($1, $2, 1)
             ON CONFLICT (user_id, coffee_id) DO UPDATE
             SET quantity = cart_items.quantity + 1`,
            [user_id, coffee_id]
        );
        res.json({ success: true, message: 'Added To Cart' });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: 'Error' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { user_id, coffee_id } = req.body;
        await pool.query(
            `UPDATE cart_items SET quantity = quantity - 1 WHERE user_id = $1 AND coffee_id = $2 AND quantity > 0`,
            [user_id, coffee_id]
        );
        // Deletes the item from the cart if quantity is equal or less than zero
        await pool.query(
            `DELETE FROM cart_items WHERE user_id = $1 AND coffee_id = $2 AND quantity <= 0`,
            [user_id, coffee_id]
        );
        res.json({ success: true, message: 'Removed From Cart' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error' });
    }
};

const removeCartById = async (req, res) => {
    try {
        const {user_id, cart_id} = req.body;
        await pool.query(
            'UPDATE cart_items SET quantity = cart_items.quantity - 1 WHERE user_id = $1 AND cart_id = $2 AND quantity > 0',
            [user_id, cart_id]
        );
        await pool.query(
            `DELETE FROM cart_items WHERE user_id = $1 AND cart_id = $2 AND quantity <= 0`,
            [user_id, cart_id]
        );
        res.json({ success: true, message: 'Removed From Cart' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error' });
    }
};

const getCartByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;
        const result = await pool.query(
            `SELECT coffee_id, quantity
             FROM cart_items
             WHERE user_id = $1`,
            [user_id]
        );
        res.json({ success: true, cartData: result.rows });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error' });
    }
};

const getUserCart = async (req, res) => {
    try {
        const { user_id } = req.body;
        const result = await pool.query(
            `SELECT
                cart_items.cart_id,
                cart_items.quantity,
                coffees.name,
                coffees.price
            FROM
                cart_items
            JOIN
                coffees
            ON
                cart_items.coffee_id = coffees.coffee_id
            WHERE
                cart_items.user_id = $1`,
            [user_id]
        );
        res.json({ success: true, cartData: result.rows });
    } catch (error) {
        console.error('Error getting user cart:', error);
        res.status(500).send('Server Error');
    }
};

const deleteFromCart = async (req, res) => {
    try {
        const {user_id, coffee_id} = req.body;
        await pool.query(
            `DELETE FROM cart_items WHERE user_id = $1 AND coffee_id = $2`, [user_id, coffee_id]
        );
        res.json({ success: true, message: 'Deleted From Cart' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error' });
    }
};

module.exports = {
    addToCart,
    removeFromCart,
    removeCartById,
    getCartByUserId,
    getUserCart,
    deleteFromCart
}