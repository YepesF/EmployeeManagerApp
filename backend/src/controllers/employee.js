import { validationResult } from "express-validator";
import { Employee, User } from "../models/index.js";

export const createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }

  const { hireDate, name, salary, email, password, role } = req.body;
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

export const getEmployees = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }

  const { page = 1, limit = 10, sortBy = "id", order = "asc" } = req.query;

  try {
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const options = {
      limit: parseInt(limit, 10),
      offset,
      order: [[sortBy, order.toUpperCase()]],
      include: {
        model: User,
        as: "user",
        attributes: ["email", "role"],
        where: {},
      },
    };

    const { count, rows } = await Employee.findAndCountAll(options);
    const parsedData = rows.map(
      ({ id, hire_date, name, salary, user, createdAt, updatedAt }) => ({
        id,
        hireDate: hire_date,
        name,
        salary,
        email: user.email,
        role: user.role,
        createdAt,
        updatedAt,
      })
    );

    res.status(200).json({
      data: parsedData,
      total: count,
      limit: options.limit,
      page: parseInt(page, 10),
      pages: Math.ceil(count / options.limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error obteniendo los empleados, por favor intente nuevamente.",
    });
  }
};

export const getEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }

  const employeeId = req.params.id;

  try {
    const employee = await Employee.findOne({
      where: { id: employeeId },
      include: {
        model: User,
        as: "user",
        attributes: ["email", "role"],
      },
    });

    if (!employee)
      return res.status(404).json({ message: "Empleado no encontrado." });

    const parsedEmployee = {
      id: employee.id,
      hireDate: employee.hire_date,
      name: employee.name,
      salary: employee.salary,
      email: employee?.user?.email || null,
      role: employee?.user?.role || null,
    };
    res.status(200).json(parsedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error obteniendo el empleado, por favor intente nuevamente.",
    });
  }
};
