import { validationResult } from "express-validator";

export const createEmployee = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors
        .array()
        .map(({ type, msg, path }) => ({ type, msg, path })),
    });
  }

  const { hireDate, name, salary, email, password, role } = req.body;
  const hire_date = hireDate;

  try {
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({
        message: "El correo electrónico ya está en uso.",
        employee: {},
      });
    }

    const newUser = await User.create({
      email,
      password,
      role,
    });

    const user_id = newUser.id;

    const newEmployee = await Employee.create({
      hire_date,
      name,
      salary,
      user_id,
    });

    res.status(201).json({
      message: "Registro exitoso.",
      employee: {
        name: newEmployee.name,
        email: newUser.email,
        hireDate: newEmployee.hire_date,
        salary: newEmployee.salary,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Registro fallido, por favor intente nuevamente.",
      employee: {},
    });
  }
};

export const getEmployees = async (req, res, next) => {
  res.status(200).send({});
};

export const getEmployee = async (req, res, next) => {
  const employeeId = req.params.id;
  // if (!employee) return res.status(404).send("Employee not found");
  res.status(200).send({});
};

export const updateEmployee = async (req, res, next) => {
  const employeeId = req.params.id;
  // if (!employee) return res.status(404).send("Employee not found");
  res.status(200).send({});
};

export const deleteEmployee = async (req, res, next) => {
  const employeeId = req.params.id;
  // if (!employee) return res.status(404).send("Employee not found");
  res.status(204).send({});
};
