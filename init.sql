--base de datos del proyecto juzgadosc
-- Tabla de administradores
CREATE TABLE administradores (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  carnet_identidad VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Tabla de clientes
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  carnet_identidad VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Tabla de abogados
CREATE TABLE abogados (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  carnet_identidad VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Tabla de jueces
CREATE TABLE jueces (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  carnet_identidad VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Tabla de expedientes
CREATE TABLE expedientes (
  numero_expediente SERIAL PRIMARY KEY,
  demandante_carnet VARCHAR(30) NOT NULL,
  demandado_carnet VARCHAR(30) NOT NULL,
  abogado_demandante_carnet VARCHAR(30) NOT NULL,
  abogado_demandado_carnet VARCHAR(30) NOT NULL,
  juez_carnet VARCHAR(30) NOT NULL,
  contenido TEXT,

  FOREIGN KEY (demandante_carnet) REFERENCES clientes(carnet_identidad),
  FOREIGN KEY (demandado_carnet) REFERENCES clientes(carnet_identidad),
  FOREIGN KEY (abogado_demandante_carnet) REFERENCES abogados(carnet_identidad),
  FOREIGN KEY (abogado_demandado_carnet) REFERENCES abogados(carnet_identidad),
  FOREIGN KEY (juez_carnet) REFERENCES jueces(carnet_identidad)
);



-- anadir docuementos en pdf (para mas adelante)
--ALTER TABLE expedientes ADD COLUMN documento_pdf TEXT;

INSERT INTO administradores (nombre, apellido,carnet_identidad, email, password)
VALUES (
  'Paul',
  'Montenegro',
  '13613954',
  'admin@gmail.com',
  '123456'
);

select *from administradores

INSERT INTO clientes (nombre, apellido, carnet_identidad, email, password)
VALUES 
  ('Luis', 'Torrez', '12345678', 'luis@gmail.com', 'cliente123'),
  ('Ana', 'Fernández', '87654321', 'ana@gmail.com', 'cliente123');

INSERT INTO abogados (nombre, apellido, carnet_identidad, email, password)
VALUES 
  ('Carlos', 'Suarez', '11112222', 'carlos@gmail.com', 'abogado123'),
  ('Marta', 'Guzmán', '33334444', 'marta@gmail.com', 'abogado123');

INSERT INTO jueces (nombre, apellido, carnet_identidad, email, password)
VALUES 
  ('Roberto', 'Quiroga', '99998888', 'roberto@gmail.com', 'juez123');

INSERT INTO expedientes (
  demandante_carnet,
  demandado_carnet,
  abogado_demandante_carnet,
  abogado_demandado_carnet,
  juez_carnet,
  contenido
)
VALUES (
  '12345678',          -- Luis Torrez
  '87654321',          -- Ana Fernández
  '11112222',          -- Carlos Suarez
  '33334444',          -- Marta Guzmán
  '99998888',          -- Roberto Quiroga
  'El demandante reclama el incumplimiento de contrato de arrendamiento...'
);