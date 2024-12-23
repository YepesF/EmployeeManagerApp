import { validationResult } from "express-validator";
import { Employee, Request } from "../models/index.js";

export const createRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }

  const { code, description, summary, employeeId } = req.body;
  const employee_id = employeeId;

  try {
    const existingEmployee = await Employee.findOne({
      where: { id: employee_id },
    });

    if (!existingEmployee)
      return res.status(404).json({ message: "Empleado no encontrado." });

    const newRequest = await Request.create({
      code,
      description,
      summary,
      employee_id,
    });

    res.status(201).json({
      id: newRequest.id,
      code: newRequest.code,
      description: newRequest.description,
      summary: newRequest.summary,
      employeeId: newRequest.employee_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Registro fallido, por favor intente nuevamente.",
    });
  }
};

export const getRequests = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }
  const { id, role } = req.user;
  const { page = 1, limit = 10, sortBy = "id", order = "desc" } = req.query;

  try {
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const options = {
      limit: parseInt(limit, 10),
      offset,
      order: [[sortBy, order.toUpperCase()]],
      include: {
        model: Employee,
        as: "employee",
        attributes: ["name"],
        where: {},
      },
    };

    if (role === "employee") {
      const existingEmployee = await Employee.findOne({
        where: { id },
      });

      if (!existingEmployee)
        return res.status(404).json({ message: "Empleado no encontrado." });
      options.where = { employee_id: id };
    }

    const { count, rows } = await Request.findAndCountAll(options);
    const parsedData = rows.map(
      ({ id, code, description, summary, employee, createdAt, updatedAt }) => ({
        id,
        code,
        description,
        summary,
        employee: employee.name,
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
      message:
        "Error obteniendo las solicitudes, por favor intente nuevamente.",
    });
  }
};

export const getRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }

  const requestId = req.params.id;

  try {
    const request = await Request.findOne({
      where: { id: requestId },
      include: {
        model: Employee,
        as: "employee",
        attributes: ["name"],
        where: {},
      },
    });

    if (!request)
      return res.status(404).json({ message: "Solicitud no encontrada." });

    const parsedRequest = {
      id: request.id,
      code: request.code,
      description: request.description,
      summary: request.summary,
      employee: request.employee.name,
    };
    res.status(200).json(parsedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error obteniendo la solicitud, por favor intente nuevamente.",
    });
  }
};

export const updateRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }

  const requestId = req.params.id;
  const { code, description, summary, employeeId } = req.body;
  const employee_id = employeeId;

  try {
    const existingEmployee = await Employee.findOne({
      where: { id: employee_id },
    });

    if (!existingEmployee)
      return res.status(404).json({ message: "Empleado no encontrado." });

    const request = await Request.findByPk(requestId);

    if (!request)
      return res.status(404).json({ message: "Solicitud no encontrada." });

    await request.update({ code, description, summary, employee_id });

    res.status(200).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error actualizando la solicitud, por favor intente nuevamente.",
    });
  }
};

export const deleteRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }

  const requestId = req.params.id;

  try {
    const request = await Request.findByPk(requestId);

    if (!request)
      return res.status(404).json({ message: "Solicitud no encontrada." });

    await request.destroy();

    res.status(200).json({
      message: "Solicitud eliminada exitosamente.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error eliminando la solicitud, por favor intente nuevamente.",
    });
  }
};
