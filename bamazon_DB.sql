DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45),
    department_name VARCHAR(45),
    price DECIMAL(10,2),
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog food", "pet care", 15.99, 15);
 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cotton balls", "personal care", .99, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cell phone case", "accessories", 15.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("comicbooks", "magazines", 3.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptops", "electronics", 495.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hagan daz", "food", 4.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dune", "DVDs", 14.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fringe", "DVDs", 19.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tylenol", "medication", 5.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pens", "office supplies", 1.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("notepad", "miscellaneous", .99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dr. Who", "DVDs", 125.99, 6);

 
 
SELECT * FROM products;