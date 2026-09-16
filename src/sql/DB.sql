CREATE DATABASE IF NOT EXISTS alquiler_equipos_computo
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;
USE alquiler_equipos_computo;

CREATE TABLE IF NOT EXISTS clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(150),
    documento VARCHAR(20),
    telefono VARCHAR(20),
    correo_electronico VARCHAR(100),
    direccion VARCHAR(255)
) ENGINE=InnoDB;
