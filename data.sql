INSERT INTO customers (custf_name, custl_name, cust_email) 
VALUES 
('John', 'Doe', 'john.doe@example.com'),
('Jane', 'Smith', 'jane.smith@example.com'),
('Michael', 'Brown', 'michael.brown@example.com'),
('Emily', 'Davis', 'emily.davis@example.com'),
('David', 'Wilson', 'david.wilson@example.com'),
('Sarah', 'Taylor', 'sarah.taylor@example.com'),
('James', 'Anderson', 'james.anderson@example.com'),
('Laura', 'Thomas', 'laura.thomas@example.com'),
('Robert', 'Moore', 'robert.moore@example.com'),
('Anna', 'Jackson', 'anna.jackson@example.com');

INSERT INTO outlets (outlet_name, building_name, addr1, addr2, zipcode) 
VALUES
('Downtown Deli', 'Skyline Tower', '123 Main St', 'Suite 101', 12345),
('Central Cafe', 'Liberty Plaza', '456 Elm St', 'Floor 2', 67890),
('Uptown Bistro', 'Pinewood Building', '789 Oak St', 'Apt 202', 23456),
('Seaside Grill', 'Oceanview Center', '101 Beach Rd', 'Unit 5', 34567),
('Mountain Eats', 'Summit Hall', '202 Alpine Way', 'Room 10', 45678);


INSERT INTO menu (menu_name, menu_price_before_tax) 
VALUES
('Classic Burger', 8.99),
('Veggie Wrap', 7.49),
('Grilled Chicken Salad', 9.99),
('Pasta Alfredo', 12.49),
('Chocolate Lava Cake', 5.99);

INSERT INTO invoices (printed, customer_id, outlet_id, menu_id)
VALUES
('2024-12-20 10:15:00', 1, 1, 2),
('2024-12-20 11:30:00', 2, 2, 3),
('2024-12-21 09:00:00', 3, 3, 1),
('2024-12-21 12:45:00', 4, 4, 5),
('2024-12-22 14:10:00', 5, 5, 4),
('2024-12-22 16:25:00', 6, 1, 3),
('2024-12-23 08:50:00', 7, 2, 2),
('2024-12-23 18:00:00', 8, 3, 4),
('2024-12-24 10:05:00', 9, 4, 1),
('2024-12-24 13:20:00', 10, 5, 5);
