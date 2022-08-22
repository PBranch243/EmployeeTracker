INSERT INTO department (name)
VALUES
  ('Human Resources'),
  ('Production'),
  ('Shipping/Receiving'),
  ('Sales');

INSERT INTO roll (title, salary, department_id)
VALUES
  ('HR Supervisor', 100000, 1),
  ('Shop Foreman', 100000, 2),
  ('Supervisor', 100000, 3),
  ('Sales Manager', 100000, 4),
  ('Dockworker', 40000, 3),
  ('Salesperson', 80000, 4),
  ('Office worker', 55000, 1),
  ('Production worker', 50000, 2);

INSERT INTO employees (first_name, last_name, roll_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 1, NULL),
  ('Piers', 'Gaveston', 2, NULL),
  ('Charles', 'LeRoi', 1, 1),
  ('Katherine', 'Mansfield', 1, 1),
  ('Dora', 'Carrington', 2, 1),
  ('Edward', 'Bellamy', 2, 2),
  ('Montague', 'Summers', 1, 2),
  ('Octavia', 'Butler', 1, 2),
  ('Unica', 'Zurn', 1, 1);