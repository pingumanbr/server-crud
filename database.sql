CREATE DATABASE contacts;

CREATE TABLE contacts(
  contacts_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255)
);
