-- Inserting departments into the departments table
INSERT INTO departments (name)
VALUES ('IT'),                -- Information Technology
       ('Human Resources'),  -- Human Resources
       ('Finance'),          -- Finance
       ('Marketing');        -- Marketing
-- Inserting roles into the roles table
INSERT INTO roles (title, salary, department_id)
VALUES ('Software Engineer', 80000, 1),       -- IT department
       ('HR Manager', 70000, 2),              -- Human Resources department
       ('Financial Analyst', 75000, 3),       -- Finance department
       ('Marketing Specialist', 70000, 4);    -- Marketing department
-- Inserting employees into the employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),         -- Software Engineer, no manager
       ('Jane', 'Smith', 2, NULL),       -- HR Manager, no manager
       ('Michael', 'Johnson', 3, NULL),  -- Financial Analyst, no manager
       ('Emily', 'Williams', 4, NULL);   -- Marketing Specialist, no manager
