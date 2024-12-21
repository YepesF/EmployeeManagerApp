CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'employee'))
);

CREATE TABLE Employees (
    id SERIAL PRIMARY KEY,
    hire_date DATE NOT NULL,
    name VARCHAR(50) NOT NULL,
    salary NUMERIC(10, 2) NOT NULL,
    user_id INT UNIQUE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Requests (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    description VARCHAR(50) NOT NULL,
    summary VARCHAR(50) NOT NULL,
    employee_id INT NOT NULL,
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) REFERENCES Employees(id)
);

INSERT INTO Users (username, email, password, role) VALUES
('admin', 'admin@example.com', 'hashed_password', 'admin'),
('jdoe', 'jdoe@example.com', 'hashed_password', 'employee');

INSERT INTO Employees (hire_date, name, salary, user_id) VALUES
('2020-01-15', 'John Doe', 50000.00, 2),
('2021-07-22', 'Jane Smith', 60000.00, NULL),
('2019-03-11', 'Carlos López', 55000.00, NULL),
('2020-06-05', 'Ana García', 58000.00, NULL),
('2021-09-19', 'Luis Martínez', 52000.00, NULL),
('2022-01-03', 'María Fernández', 62000.00, NULL),
('2018-11-23', 'José Pérez', 51000.00, NULL),
('2019-07-10', 'Laura Sánchez', 49000.00, NULL),
('2020-12-13', 'Pedro Gómez', 47000.00, NULL),
('2021-05-25', 'Elena Ruiz', 53000.00, NULL);

INSERT INTO Requests (code, description, summary, employee_id) VALUES
('REQ-001', 'Solicitud de equipo', 'Compra de laptop nueva', 1),
('REQ-002', 'Solicitud de capacitación', 'Curso avanzado en React', 2),
('REQ-003', 'Cambio de puesto', 'Ascenso a supervisor', 3),
('REQ-004', 'Vacaciones', 'Solicitud de 15 días', 4),
('REQ-005', 'Incremento salarial', 'Revisión de salario anual', 5),
('REQ-006', 'Equipo de oficina', 'Compra de silla ergonómica', 6),
('REQ-007', 'Cambio de horario', 'Solicitud de horario flexible', 7),
('REQ-008', 'Certificación técnica', 'Examen de certificación AWS', 8),
('REQ-009', 'Licencia médica', 'Ausencia por 10 días', 9),
('REQ-010', 'Capacitación interna', 'Taller de liderazgo', 10),
('REQ-011', 'Cambio de proyecto', 'Asignación a nuevo cliente', 1),
('REQ-012', 'Solicitud de recursos', 'Adquisición de software', 2),
('REQ-013', 'Equipo dañado', 'Reemplazo de monitor', 3),
('REQ-014', 'Ajuste salarial', 'Ajuste por inflación', 4),
('REQ-015', 'Reasignación de tareas', 'Cambio de responsabilidades', 5),
('REQ-016', 'Asistencia a conferencia', 'Conferencia en tecnología', 6),
('REQ-017', 'Trabajo remoto', 'Solicitud de home office', 7),
('REQ-018', 'Reubicación', 'Traslado a nueva oficina', 8),
('REQ-019', 'Promoción', 'Evaluación para ascenso', 9),
('REQ-020', 'Renovación de contrato', 'Extensión de contrato anual', 10);