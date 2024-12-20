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
