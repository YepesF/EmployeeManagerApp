import { validationResult } from "express-validator";
import { Employee, Request } from "../models/index.js";

export const createRequest = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors
        .array()
        .map(({ type, msg, path }) => ({ type, msg, path })),
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

export const getRequests = async (req, res, next) => {
  res.status(200).send({});
};

export const getRequest = async (req, res, next) => {
  const requestId = req.params.id;
  // if (!request) return res.status(404).send("Request not found");
  res.status(200).send({});
};

export const updateRequest = async (req, res, next) => {
  const requestId = req.params.id;
  // if (!request) return res.status(404).send("Request not found");
  res.status(200).send({});
};

export const deleteRequest = async (req, res, next) => {
  const requestId = req.params.id;
  // if (!request) return res.status(404).send("Request not found");
  res.status(204).send({});
};
