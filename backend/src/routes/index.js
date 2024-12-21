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
import { login, register } from "../controllers/auth.js";
import { validateLogin, validateRegister } from "../middlewares/validators.js";
import { verifyRole, verifyToken } from "../middlewares/authToken.js";

const router = express.Router();

// Auth. routes
router.post("/auth/register", validateRegister, register);
router.post("/auth/login", validateLogin, login);

// Employees routes
router.post("/employees", verifyToken, verifyRole(["admin"]), createEmployee);
router.get("/employees", verifyToken, verifyRole(["admin"]), getEmployees);
router.get("/employees/:id", verifyToken, verifyRole(["admin"]), getEmployee);
router.put(
  "/employees/:id",
  verifyToken,
  verifyRole(["admin"]),
  updateEmployee
);
router.delete(
  "/employees/:id",
  verifyToken,
  verifyRole(["admin"]),
  deleteEmployee
);

// Requests routes
router.post("/requests", verifyToken, verifyRole(["admin"]), createRequest);
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

// Users routes
router.post("/users", verifyToken, verifyRole(["admin"]), createUser);
router.get("/users", verifyToken, verifyRole(["admin"]), getUsers);
router.get("/users/:id", verifyToken, verifyRole(["admin"]), getUser);
router.put("/users/:id", verifyToken, verifyRole(["admin"]), updateUser);
router.delete("/users/:id", verifyToken, verifyRole(["admin"]), deleteUser);

export default router;
