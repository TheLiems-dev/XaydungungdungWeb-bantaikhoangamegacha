
CREATE DATABASE IF NOT EXISTS Gacha_Acc_Shop;
USE Gacha_Acc_Shop;


CREATE TABLE account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    game_server VARCHAR(100) NOT NULL,
    level INT DEFAULT 1,
    price INT NOT NULL,
    status VARCHAR(50) DEFAULT 'available'
);


INSERT INTO account (username, game_server, level, price, status) VALUES 
('Reroll_account', 'Asia', 48, 75000, 'available'),
('VIP_account', 'Sea', 80, 3500000, 'sold');