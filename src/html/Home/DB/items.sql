/*CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);*/

INSERT INTO products (name, price, description, image_url) VALUES
('Mercedes-Benz Classe E', 50, 'Amazing car','https://ultimateblackcar.com/wp-content/uploads/2018/08/cc_2022MBCCK0003_01_640_197.jpg'),
('Ferrari 296', 100, 'Its a Ferrari!', 'https://ferrari-cdn.thron.com/delivery/public/image/ferrari/7c9ff38f-4f59-4061-9eaf-f07567430eaf/3zayf6/std/0x640/DWS_ferrari_296_GTB-gallery-1?quality=auto-high&format=auto'),
('Lamborghini Urus', 80, 'Not better than the Ferrari', 'https://www.razaoautomovel.com/wp-content/uploads/2024/04/Lamborghini-Urus-PHEV-2025-4_925x520_acf_cropped.jpg'),
('Honda Civic', 30, 'Reliable Car', 'https://honda-automoveis.pt/blog/wp-content/uploads/2020/06/decima-geracao-honda-civic-1.jpg'),
('Peugeot 206', 20, 'Yhe best car!', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/2002_Peugeot_206_LX_1.4_Front.jpg/1200px-2002_Peugeot_206_LX_1.4_Front.jpg');