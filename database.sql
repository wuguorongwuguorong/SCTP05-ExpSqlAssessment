create database allWestern;

use allWestern;

CREATE TABLE customers(
   customer_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
   custf_name VARCHAR(45) NOT NULL,
   custl_name VARCHAR(45) NOT NULL,
   cust_email VARCHAR(100) NOT NULL
) engine = innodb;

CREATE TABLE employees(
   employee_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
   empf_name VARCHAR(45) NOT NULL,
   empl_name VARCHAR(45) NOT NULL
) engine = innodb;

CREATE TABLE outlets(
   outlet_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
   outlet_name VARCHAR(30) NOT NULL,
   buidling_name VARCHAR(30) NOT NULL,
   addr1 VARCHAR(45) NOT NULL,
   addr2 VARCHAR(45) NOT NULL,
   zipcode int(10) NOT NULL
) engine = innodb;

CREATE TABLE roles(
   role_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
   role_name VARCHAR(30) NOT NULL
) engine = innodb;

CREATE TABLE menu(
   menu_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
   menu_name VARCHAR(30) NOT NULL,
   menu_price_before_tax FLOAT NOT NULL
) engine = innodb;

CREATE TABLE schedules(
   schedule_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
   clock_in DATETIME NOT NULL,
   clock_out DATETIME NOT NULL
) engine = innodb;

CREATE TABLE invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    printed TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ); engine = innodb;

--adding role and outlet id into employees table
ALTER TABLE employees ADD COLUMN role_id int UNSIGNED;
ALTER TABLE employees ADD COLUMN outlet_id int UNSIGNED;
ALTER TABLE employees ADD CONSTRAINT fk_roles_employees FOREIGN KEY(role_id) REFERENCES roles(role_id);
ALTER TABLE employees ADD CONSTRAINT fk_outlet_employees FOREIGN KEY(outlet_id) REFERENCES outlets(outlet_id);

--adding employee and outlet id into schedules
ALTER TABLE schedules ADD COLUMN employee_id int UNSIGNED;
ALTER TABLE schedules ADD COLUMN outlet_id int UNSIGNED;
ALTER TABLE schedules ADD CONSTRAINT fk_employees_schdules FOREIGN KEY(employee_id) REFERENCES employees(employee_id);
ALTER TABLE schedules ADD CONSTRAINT fk_outlet_schdules FOREIGN KEY(outlet_id) REFERENCES outlets(outlet_id);

--adding menu, outlet and customer id into invoices
ALTER TABLE invoices ADD COLUMN customer_id int UNSIGNED;
ALTER TABLE invoices ADD COLUMN menu_id int UNSIGNED;
ALTER TABLE invoices ADD COLUMN outlet_id int UNSIGNED;
ALTER TABLE invoices ADD CONSTRAINT fk_customers_invoice FOREIGN KEY(customer_id) REFERENCES customers(customer_id);
ALTER TABLE invoices ADD CONSTRAINT fk_menu_invoice FOREIGN KEY(menu_id) REFERENCES menu(menu_id);
ALTER TABLE invoices ADD CONSTRAINT fk_outlet_invoice FOREIGN KEY(outlet_id) REFERENCES outlets(outlet_id);


