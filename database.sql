CREATE DATABASE perntodo;

CREATE TABLE contacts(
  todo_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255)
);