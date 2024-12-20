import { validationResult } from "express-validator";
import { Employee, User } from "../models/index.js";
import { generateToken } from "../middlewares/authToken.js";

export const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors
        .array()
        .map(({ type, msg, path }) => ({ type, msg, path })),
    });
  }

  const { name, hireDate, salary, email, password } = req.body;
  const role = "employee"; // User with role 'admin' can change to role 'admin', only.
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

export const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({
      errors: errors
        .array()
        .map(({ type, msg, path }) => ({ type, msg, path })),
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        message: "Empleado no existe.",
        employee: {},
      });
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Contraseña incorrecta.",
        employee: {},
      });
    }

    const token = generateToken({ id: user.id, role: user.role });
    const employee = await Employee.findOne({ where: { user_id: user.id } });

    res.status(201).json({
      message: "Inico de sesión exitoso.",
      employee: {
        name: employee.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Inico de sesión fallido, por favor intente nuevamente.",
      employee: {},
    });
  }
};
