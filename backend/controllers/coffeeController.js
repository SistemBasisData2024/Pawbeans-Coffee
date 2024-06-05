const pool = require('../db/db');

// Get all coffees
const getCoffees = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM coffees');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Add personalized coffee
const addPersonalizedCoffee = async (req, res) => {
    try {
        const { userId, rating, description, beanType, topping, size, servingType } = req.body;

        const newPersonalizedCoffee = await pool.query(
            `INSERT INTO personalized_coffees (user_id, rating, description, bean_type, topping, size, serving_type) 
             VALUES ($1, $2, $3, $4, $5::text[], $6, $7) RETURNING *`,
            [userId, rating, description, beanType, topping, size, servingType]
        );

        res.json(newPersonalizedCoffee.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get all personalized coffees
const getPersonalizedAll = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT pc.*, u.username, u.is_anonymous
            FROM personalized_coffees pc
            JOIN users u ON pc.user_id = u.user_id
            ORDER BY pc.rating DESC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get personalized coffees by user
const getPersonalizedCoffeesByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await pool.query(
            `SELECT pc.*, 
                COALESCE(ROUND(AVG(r.rating), 1), pc.rating) AS average_rating
             FROM personalized_coffees pc
             LEFT JOIN personalized_coffee_ratings r 
             ON pc.personalized_coffee_id = r.personalized_coffee_id
             WHERE pc.user_id = $1
             GROUP BY pc.personalized_coffee_id`,
            [userId]
        );

        const personalizedCoffees = result.rows.map(row => ({
            ...row,
            topping: Array.isArray(row.topping) ? row.topping : [],
            average_rating: parseFloat(row.average_rating)
        }));

        console.log('Fetched Personalized Coffees:', personalizedCoffees);

        res.json(personalizedCoffees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete personalized coffee
const deletePersonalizedCoffee = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM personalized_coffees WHERE personalized_coffee_id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Personalized coffee not found' });
        }

        res.json({ message: 'Personalized coffee deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add rating to personalized coffee
const addRating = async (req, res) => {
    try {
        const { userId, personalizedCoffeeId, rating } = req.body;
        await pool.query(
            `INSERT INTO personalized_coffee_ratings (user_id, personalized_coffee_id, rating)
             VALUES ($1, $2, $3)
             ON CONFLICT (user_id, personalized_coffee_id) 
             DO UPDATE SET rating = $3`,
            [userId, personalizedCoffeeId, rating]
        );
        const result = await pool.query(
            `UPDATE personalized_coffees
             SET rating = ROUND((
                 SELECT AVG(rating) 
                 FROM personalized_coffee_ratings 
                 WHERE personalized_coffee_id = $1
             ), 1)
             WHERE personalized_coffee_id = $1
             RETURNING rating`,
            [personalizedCoffeeId]
        );

        console.log('Updated Rating:', result.rows[0].rating);

        res.json({ message: 'Rating added/updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


module.exports = {
    getCoffees,
    addPersonalizedCoffee,
    getPersonalizedCoffeesByUser,
    getPersonalizedAll,
    deletePersonalizedCoffee,
    addRating,
};
