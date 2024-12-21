import { body } from "express-validator";

export const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio.")
    .isEmail()
    .withMessage("El correo debe ser válido.")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres.")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe contener al menos una letra minúscula.")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe contener al menos una letra mayúscula.")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe contener al menos un número."),
];

export const validateRegister = [
  ...validateLogin,
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ max: 50 })
    .withMessage("El nombre no puede exceder los 50 caracteres."),
  body("hireDate")
    .notEmpty()
    .withMessage("La fecha de contratación es obligatoria.")
    .isISO8601()
    .withMessage("La fecha debe estar en formato ISO8601."),
  body("salary")
    .notEmpty()
    .withMessage("El salario es obligatorio.")
    .isFloat({ min: 0 })
    .withMessage("El salario debe ser un número positivo."),
];

export const createEmployee = [
  ...validateRegister,
  body("role")
    .trim()
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio.")
    .isString()
    .withMessage("Rol debe ser de tipo texto.")
    .isIn(["admin", "employee"])
    .withMessage("Rol debería ser 'admin' o 'employee'."),
];
