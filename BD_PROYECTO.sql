-- Crear la base de datos
CREATE DATABASE ulibertadores;

-- Usar la base de datos
USE Ulibertadores;

-- Crear las tablas

-- Tabla Estudiantes
CREATE TABLE Estudiantes (
    cod_e INT PRIMARY KEY,          -- Código único del estudiante
    nom_e VARCHAR(100) NOT NULL,    -- Nombre del estudiante
    dir_e VARCHAR(150),             -- Dirección del estudiante
    tel_e VARCHAR(15),              -- Teléfono del estudiante
    fech_nac DATE                   -- Fecha de nacimiento del estudiante
);

-- Tabla Asignaturas
CREATE TABLE Asignaturas (
    cod_a INT PRIMARY KEY,          -- Código único de la asignatura
    nom_a VARCHAR(100) NOT NULL,    -- Nombre de la asignatura
    int_h INT NOT NULL,             -- Intensidad horaria
    creditos INT NOT NULL           -- Créditos de la asignatura
);

-- Tabla Profesores
CREATE TABLE Profesores (
    id_p INT PRIMARY KEY,           -- Identificación única del profesor
    nom_p VARCHAR(100) NOT NULL,    -- Nombre del profesor
    dir_p VARCHAR(150),             -- Dirección del profesor
    tel_p VARCHAR(15),              -- Teléfono del profesor
    profesion VARCHAR(100) NOT NULL -- Profesión del profesor
);

-- Tabla Imparte
CREATE TABLE Imparte (
    id_p INT,                       -- Identificación del profesor
    cod_a INT,                      -- Código de la asignatura
    grupo VARCHAR(10),              -- Grupo de estudiantes
    horario VARCHAR(50),            -- Horario de la asignatura
    PRIMARY KEY (id_p, cod_a, grupo),
    FOREIGN KEY (id_p) REFERENCES Profesores(id_p) ON DELETE CASCADE,
    FOREIGN KEY (cod_a) REFERENCES Asignaturas(cod_a) ON DELETE CASCADE
);

-- Tabla Inscribe
CREATE TABLE Inscribe (
    cod_e INT,                      -- Código del estudiante
    cod_a INT,                      -- Código de la asignatura
    id_p INT,                       -- Identificación del profesor
    grupo VARCHAR(10),              -- Grupo de estudiantes
    n1 FLOAT,                       -- Nota 1
    n2 FLOAT,                       -- Nota 2
    n3 FLOAT,                       -- Nota 3
    PRIMARY KEY (cod_e, cod_a, id_p, grupo),
    FOREIGN KEY (cod_e) REFERENCES Estudiantes(cod_e) ON DELETE CASCADE,
    FOREIGN KEY (cod_a) REFERENCES Asignaturas(cod_a) ON DELETE CASCADE,
    FOREIGN KEY (id_p) REFERENCES Profesores(id_p) ON DELETE CASCADE
);
