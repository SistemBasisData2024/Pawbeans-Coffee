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



INSERT INTO coffees (name, price) VALUES
('Espresso', 2.50),
('Latte', 3.50),
('Cappuccino', 3.00),
('Machiato', 3.20)
;

INSERT INTO personalized_coffees (user_id, rating, review, bean_type, topping, size, serving_type) VALUES
(1, 4.5, 'Great espresso with a nice aroma!', 'Bali Kintamani Arabica', 'none', 'small', 'hot'),
(2, 4.2, 'Delicious latte with perfect amount of milk', 'Dampit Robusta', 'chocolate sauce', 'medium', 'hot'),
(3, 4.3, 'Cappuccino with a wonderful frothy top!', 'Toraja Robusta', 'caramel sauce', 'large', 'cold');