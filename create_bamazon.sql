DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
item_id INT(10) AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50),
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(10) NOT NULL,
PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Embroidered Quilt", "Bedroom", 248.00, 3),
("Tasseled Sconce", "Bedroom", 118.00, 5),
("Fringe Pillow", "Bedroom", 78.00, 10),
( "Cake Stand", "Kitchen", 68.00, 2),
( "Table Pitcher", "Kitchen", 42.00, 7),
( "Painted Mug", "Kitchen", 14.00, 14),
( "Cheese Board", "Kitchen", 32.00, 1),
( "Garden Pot", "Outdoor", 8.00, 16),
( "Gilded Lantern", "Outdoor", 48.00, 3),
("Hammock", "Outdoor", 115.00, 2);