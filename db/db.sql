CREATE DATABASE IF NOT EXISTS inmobiliaria;

USE inmobiliaria;

-- Crear la tabla properties
CREATE TABLE properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de prueba
INSERT INTO properties (title, description, price, location)
VALUES 
  ('Casa con jardín', 'Casa de 3 habitaciones y 2 baños', 150000, 'Madrid'),
  ('Piso céntrico', 'Piso de 2 habitaciones y 1 baño', 100000, 'Barcelona'),
  ('Ático con terraza', 'Ático de lujo con 3 habitaciones y 2 baños', 200000, 'Valencia');  
```

DELETE FROM properties WHERE id = 13;