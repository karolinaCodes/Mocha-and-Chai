
DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR (255) NOT NULL,
  url VARCHAR (255),
  price INTEGER NOT NULL,
  description TEXT,
  type VARCHAR (50) NOT NULL
);
