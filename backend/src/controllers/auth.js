import { validationResult } from "express-validator";
import { Employee, User } from "../models/index.js";

export const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({ errors: errors.array() });
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
      message: "Registro exitoso",
      employee: {
        id: newEmployee.id,
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
      message: "Registro fallido, por favo intente nuevamente",
      employee: {},
    });
  }
};
