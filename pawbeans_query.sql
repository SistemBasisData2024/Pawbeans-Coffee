CREATE DATABASE Pawbeans_database;

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
    bean_type bean_type NOT NULL,
    topping TEXT[] NOT NULL, 
    size size NOT NULL,
    serving_type serving_type NOT NULL,
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

CREATE OR REPLACE FUNCTION update_average_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE personalized_coffees
    SET rating = (
        SELECT ROUND(AVG(rating), 1)
        FROM personalized_coffee_ratings
        WHERE personalized_coffee_id = NEW.personalized_coffee_id
    )
    WHERE personalized_coffee_id = NEW.personalized_coffee_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rating_trigger
AFTER INSERT OR UPDATE ON personalized_coffee_ratings
FOR EACH ROW
EXECUTE FUNCTION update_average_rating();

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
