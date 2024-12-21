import User from "../models/User.js";

export const createRequest = async (req, res, next) => {
  const { code, description, summary, employeeId } = req.body;
  res.status(201).send({});
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
