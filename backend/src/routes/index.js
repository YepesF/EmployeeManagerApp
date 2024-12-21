import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employee.js";
import {
  createRequest,
  deleteRequest,
  getRequest,
  getRequests,
  updateRequest,
} from "../controllers/request.js";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { register } from "../controllers/auth.js";
import { validateRegister } from "../utils/validators.js";

const router = express.Router();

// Auth. routes
router.post("/auth/register", validateRegister, register);

// Employees routes
router.post("/employees", createEmployee);
router.get("/employees", getEmployees);
router.get("/employees/:id", getEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

// Requests routes
router.post("/requests", createRequest);
router.get("/requests", getRequests);
router.get("/requests/:id", getRequest);
router.put("/requests/:id", updateRequest);
router.delete("/requests/:id", deleteRequest);

// Users routes
router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
