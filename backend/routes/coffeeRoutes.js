const express = require('express');
const {getCoffees,addPersonalizedCoffee,getPersonalizedCoffeesByUser,getPersonalizedAll,deletePersonalizedCoffee,addRating} = require('../controllers/coffeeController');

const router = express.Router();

router.post('/personalized-coffees', addPersonalizedCoffee);
router.get('/personalized-coffees/:userId', getPersonalizedCoffeesByUser);
router.get('/coffees', getCoffees);
router.get('/personalized-coffees', getPersonalizedAll);
router.delete('/personalized-coffees/:id', deletePersonalizedCoffee);
router.post('/ratings', addRating);

module.exports = router;
