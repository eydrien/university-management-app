create database dbuniversidad;
use dbuniversidad;
-- Tabla Estudiantes
CREATE TABLE Estudiantes (
    cod_e INT PRIMARY KEY CHECK (cod_e>0),          -- Código único del estudiante
    nom_e VARCHAR(100) NOT NULL,    -- Nombre del estudiante
    dir_e VARCHAR(150) NOT NULL,             -- Dirección del estudiante
    tel_e VARCHAR(15) NOT NULL CHECK (tel_e>0),              -- Teléfono del estudiante
    fech_nac DATE NOT NULL                   -- Fecha de nacimiento del estudiante
);

-- Tabla Asignaturas
CREATE TABLE Asignaturas (
    cod_a INT PRIMARY KEY CHECK (cod_a>0),          -- Código único de la asignatura
    nom_a VARCHAR(100) NOT NULL,    -- Nombre de la asignatura
    int_h INT NOT NULL CHECK (int_h>0),             -- Intensidad horaria
    creditos INT NOT NULL CHECK (creditos>0)           -- Créditos de la asignatura
);

-- Tabla Profesores
CREATE TABLE Profesores (
    id_p INT PRIMARY KEY CHECK (id_p>0),           -- Identificación única del profesor
    nom_p VARCHAR(100) NOT NULL,    -- Nombre del profesor
    dir_p VARCHAR(150) NOT NULL,             -- Dirección del profesor
    tel_p VARCHAR(15) NOT NULL CHECK (tel_p>0),              -- Teléfono del profesor
    profesion VARCHAR(100) NOT NULL -- Profesión del profesor
);

-- Tabla Imparte
CREATE TABLE Imparte (
    id_p INT,                       -- Identificación del profesor
    cod_a INT,                      -- Código de la asignatura
    grupo INT CHECK (grupo>0),              -- Grupo de estudiantes
    semestre INT CHECK (semestre>0),
    horario VARCHAR(50) NOT NULL,            -- Horario de la asignatura
    CONSTRAINT pk_imparte PRIMARY KEY (id_p, cod_a, grupo, semestre),
    CONSTRAINT fk_imparte_profesores FOREIGN KEY (id_p) REFERENCES Profesores(id_p) ON UPDATE CASCADE,
    CONSTRAINT fk_imparte_asignaturas FOREIGN KEY (cod_a) REFERENCES Asignaturas(cod_a) ON UPDATE CASCADE
);

-- Tabla Inscribe
CREATE TABLE Inscribe (
    cod_e INT,                      -- Código del estudiante
    cod_a INT,                      -- Código de la asignatura
    id_p INT,                       -- Identificación del profesor
    grupo INT, 			            -- Grupo de estudiantes
    semestre INT,              -- Semestre
    n1 FLOAT(1) check (n1 between 0 and 5) default 0,                       -- Nota 1
    n2 FLOAT(1) check (n2 between 0 and 5) default 0,                       -- Nota 2
    n3 FLOAT(1) check (n3 between 0 and 5) default 0,                       -- Nota 3
    CONSTRAINT pk_inscribe PRIMARY KEY (cod_e, cod_a, id_p, grupo, semestre),
    CONSTRAINT fk_inscribe_estudiantes FOREIGN KEY (cod_e) REFERENCES Estudiantes(cod_e) ON UPDATE CASCADE,
    CONSTRAINT fk_inscribe_imparte FOREIGN KEY (id_p, cod_a, grupo, semestre) REFERENCES Imparte(id_p, cod_a, grupo, semestre) ON UPDATE CASCADE
);