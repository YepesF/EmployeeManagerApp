import express from "express";
import {
  createEmployee,
  getEmployee,
  getEmployees,
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
  validateLogin,
  validateRegister,
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
  validateCreateRequest,
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
  getRequests
);
router.get(
  "/requests/:id",
  verifyToken,
  verifyRole(["admin", "employee"]),
  getRequest
);
router.put("/requests/:id", verifyToken, verifyRole(["admin"]), updateRequest);
router.delete(
  "/requests/:id",
  verifyToken,
  verifyRole(["admin"]),
  deleteRequest
);

export default router;
