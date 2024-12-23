import { validationResult } from "express-validator";
import { Employee, User } from "../models/index.js";
import { generateToken } from "../middlewares/authToken.js";

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
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
      name: newEmployee.name,
      email: newUser.email,
      hireDate: newEmployee.hire_date,
      salary: newEmployee.salary,
      role: newUser.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Registro fallido, por favor intente nuevamente.",
    });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        message: "Empleado no existe.",
      });
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Contraseña incorrecta.",
      });
    }

    const employee = await Employee.findOne({ where: { user_id: user.id } });
    const token = generateToken({ id: employee.id, role: user.role });

    res.status(201).json({
      user: { name: employee.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Inico de sesión fallido, por favor intente nuevamente.",
    });
  }
};
