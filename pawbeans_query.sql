CREATE DATABASE pawbeans_database;
\c pawbeans_database;

CREATE TYPE bean_type AS ENUM (
    'Bali Kintamani Arabica',
    'Dampit Robusta',
    'Toraja Robusta',
    'Sidikalang Robusta'
);

CREATE TYPE size AS ENUM (
    'small', 
    'medium', 
    'large'
);

CREATE TYPE serving_type AS ENUM (
    'hot', 
    'cold'
);

CREATE TYPE order_status AS ENUM (
    'Paid',
    'Waiting for Payment'
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coffees (
    coffee_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE personalized_coffees (
    personalized_coffee_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    description TEXT,
    bean_type VARCHAR(50) NOT NULL,
    topping TEXT[] NOT NULL, 
    size VARCHAR(20) NOT NULL,
    serving_type VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    rating DECIMAL(2, 1) DEFAULT 0
);

CREATE TABLE personalized_coffee_ratings (
    rating_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    personalized_coffee_id INT REFERENCES personalized_coffees(personalized_coffee_id) ON DELETE CASCADE,
    rating DECIMAL(2, 1) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, personalized_coffee_id)
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    items VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL,
    address VARCHAR(255) NOT NULL,
    status order_status NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    payment BOOLEAN NOT NULL,
    UNIQUE (user_id, order_id)
);

CREATE TABLE cart_items (
    cart_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    coffee_id INT REFERENCES coffees(coffee_id),
    quantity INTEGER NOT NULL,
    UNIQUE (user_id, cart_id)
);

ALTER TABLE cart_items
ADD CONSTRAINT cart_items_key UNIQUE (user_id, coffee_id);

INSERT INTO coffees (name, price) VALUES
('Espresso', 2.50),
('Latte', 3.50),
('Cappuccino', 3.00),
('Machiato', 3.20);

SELECT pc.*,
       COALESCE(ROUND(AVG(r.rating), 1), pc.rating) AS average_rating
FROM personalized_coffees pc
LEFT JOIN personalized_coffee_ratings r
ON pc.personalized_coffee_id = r.personalized_coffee_id
WHERE pc.user_id = 3
GROUP BY pc.personalized_coffee_id;

SELECT
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
    cart_items.user_id = 3;


INSERT INTO personalized_coffees (user_id, rating, review, bean_type, topping, size, serving_type) VALUES
(1, 4.5, 'Great espresso with a nice aroma!', 'Bali Kintamani Arabica', 'none', 'small', 'hot'),
(2, 4.2, 'Delicious latte with perfect amount of milk', 'Dampit Robusta', 'chocolate sauce', 'medium', 'hot'),
(3, 4.3, 'Cappuccino with a wonderful frothy top!', 'Toraja Robusta', 'caramel sauce', 'large', 'cold');
