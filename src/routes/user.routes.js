import { Router } from "express";
import { body, param } from "express-validator";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/user.controllers.js";
import { validateFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("El nombre es obligatorio").isLength({ max: 100 }),
    body("email").isEmail().withMessage("Debe ser un email válido"),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    validateFields,
  ],
  createUser
);

router.get("/", getAllUsers);

router.get(
  "/:id",
  [param("id").isInt().withMessage("El ID debe ser un número entero"), validateFields],
  getUserById
);

router.put(
  "/:id",
  [
    param("id").isInt().withMessage("El ID debe ser un número entero"),
    body("name").optional().isLength({ max: 100 }),
    body("email").optional().isEmail(),
    body("password").optional().isLength({ min: 6 }),
    validateFields,
  ],
  updateUser
);

router.delete(
  "/:id",
  [param("id").isInt().withMessage("El ID debe ser un número entero"), validateFields],
  deleteUser
);

export default router;
