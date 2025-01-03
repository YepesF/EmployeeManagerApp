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
import { login, register } from "../controllers/auth.js";
import {
  validateCreateEmployee,
  validateCreateRequest,
  validateEmployeeId,
  validateGetEmployees,
  validateGetRequests,
  validateLogin,
  validateRegister,
  validateRequestId,
} from "../middlewares/validators.js";
import { verifyRole, verifyToken } from "../middlewares/authToken.js";

const router = express.Router();

// Auth. routes
router.post("/auth/register", validateRegister, register);
router.post("/auth/login", validateLogin, login);

// Employees routes
router.post(
  "/employees",
  verifyToken,
  verifyRole(["admin"]),
  validateCreateEmployee,
  createEmployee
);
router.get(
  "/employees",
  verifyToken,
  verifyRole(["admin"]),
  validateGetEmployees,
  getEmployees
);
router.get(
  "/employees/:id",
  verifyToken,
  verifyRole(["admin"]),
  validateEmployeeId,
  getEmployee
);
router.put(
  "/employees/:id",
  verifyToken,
  verifyRole(["admin"]),
  validateEmployeeId,
  validateCreateEmployee,
  updateEmployee
);
router.delete(
  "/employees/:id",
  verifyToken,
  verifyRole(["admin"]),
  validateEmployeeId,
  deleteEmployee
);

// Requests routes
router.post(
  "/requests",
  verifyToken,
  verifyRole(["admin"]),
  validateCreateRequest,
  createRequest
);
router.get(
  "/requests",
  verifyToken,
  verifyRole(["admin", "employee"]),
  validateGetRequests,
  getRequests
);
router.get(
  "/requests/:id",
  verifyToken,
  verifyRole(["admin", "employee"]),
  validateRequestId,
  getRequest
);
router.put(
  "/requests/:id",
  verifyToken,
  verifyRole(["admin"]),
  validateRequestId,
  validateCreateRequest,
  updateRequest
);
router.delete(
  "/requests/:id",
  verifyToken,
  verifyRole(["admin"]),
  validateRequestId,
  deleteRequest
);

export default router;
