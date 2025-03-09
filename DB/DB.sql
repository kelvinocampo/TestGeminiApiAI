DROP DATABASE IF EXISTS testIA;
CREATE DATABASE IF NOT EXISTS testIA;
USE testIA;

-- Crear la tabla 'user'
CREATE TABLE IF NOT EXISTS user (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100)
);

-- Crear la tabla 'product'
CREATE TABLE IF NOT EXISTS product (
    id_product INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(200)
);

INSERT INTO user (name, email) VALUES
('Juan Pérez', 'juan.perez@example.com'),
('María García', 'maria.garcia@example.com'),
('Carlos López', 'carlos.lopez@example.com'),
('Ana Martínez', 'ana.martinez@example.com'),
('Luis Rodríguez', 'luis.rodriguez@example.com');

INSERT INTO product (name, description) VALUES
('Laptop', 'Laptop de 15 pulgadas con 16GB de RAM'),
('Smartphone', 'Teléfono inteligente con cámara de 48MP'),
('Tablet', 'Tablet de 10 pulgadas con pantalla HD'),
('Monitor', 'Monitor LED de 24 pulgadas'),
('Teclado', 'Teclado mecánico RGB');