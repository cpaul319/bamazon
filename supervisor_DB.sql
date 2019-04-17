DROP DATABASE IF EXISTS supervisor_DB;

CREATE DATABASE supervisor_DB;

USE supervisor_DB;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  overhead_costs DECIMAL(10,2) NULL,
  PRIMARY KEY (department_id)
);

ALTER TABLE products
ADD COLUMN product_sales INTEGER(10) DEFAULT 0 AFTER stock_quantity;