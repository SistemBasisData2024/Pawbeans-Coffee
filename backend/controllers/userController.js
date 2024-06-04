const pool = require('../db/db');
const bcrypt = require('bcrypt');

// Signup
const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userExists = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );

        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.json({ message: 'Login successful', user: user.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Toggle Anonymous
const toggleAnonymous = async (req, res) => {
    try {
        const { userId, isAnonymous } = req.body;
        const result = await pool.query(
            'UPDATE users SET is_anonymous = $1 WHERE user_id = $2 RETURNING *',
            [isAnonymous, userId]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    signup,
    login,
    toggleAnonymous,
};
