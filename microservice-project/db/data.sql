INSERT INTO users (id, name, email) VALUES
(1, 'John Doe', 'john.doe@example.com'),
(2, 'Jane Smith', 'jane.smith@example.com');

INSERT INTO products (id, name, price) VALUES
(1, 'Product A', 29.99),
(2, 'Product B', 49.99);

INSERT INTO orders (id, user_id, product_id, quantity) VALUES
(1, 1, 1, 2),
(2, 2, 2, 1);