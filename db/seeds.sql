INSERT INTO department (name) 
VALUES 
  ('Engineering'),
  ('Sales'),
  ('Marketing');

-- Insert updated roles with salaries and department ids
INSERT INTO role (title, salary, department_id) 
VALUES
  ('Software Engineer', 190000, 1),
  ('Sales Manager', 170000, 2),
  ('Marketing Specialist', 160000, 3);

-- Insert updated employees with first_name, last_name, role_id, manager_id
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
  ('Alvin', 'Munk', 1, NULL),
  ('Simon', 'Munk', 2, NULL),
  ('Theodore', 'Munk', 3, NULL);