-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  date DATE DEFAULT NOW(),
  total INTEGER NOT NULL,
  order_url VARCHAR (255),
  status VARCHAR (25) NOT NULL,
  estimated_time SmallInt,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE
);
