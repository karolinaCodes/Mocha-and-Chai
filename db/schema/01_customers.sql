-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS customers CASCADE;
CREATE TABLE customers (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(225),
  last_name VARCHAR(225),
  email VARCHAR(225),
  phone_no VARCHAR(50) NOT NULL
);


