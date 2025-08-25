import { Router } from "express";
import { body, param } from "express-validator";
import {createTask, getAllTasks, getTaskById, updateTask, deleteTask} from "../controllers/task.controllers.js";
import { validateFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.post(
  "/",
  [
    body("title").notEmpty().withMessage("El título es obligatorio").isLength({ max: 100 }),
    body("description").notEmpty().withMessage("La descripción es obligatoria"),
    body("status").optional().isIn(["pending", "in-progress", "done"]),
    body("userId").isInt().withMessage("El userId debe ser un número entero"),
    body("projectId").optional().isInt(),
    validateFields,
  ],
  createTask
);

router.get("/", getAllTasks);

router.get(
  "/:id",
  [param("id").isInt().withMessage("El ID debe ser un número entero"), validateFields],
  getTaskById
);

router.put(
  "/:id",
  [
    param("id").isInt().withMessage("El ID debe ser un número entero"),
    body("title").optional().isLength({ max: 100 }),
    body("description").optional().notEmpty(),
    body("status").optional().isIn(["pending", "in-progress", "done"]),
    body("userId").optional().isInt(),
    body("projectId").optional().isInt(),
    validateFields,
  ],
  updateTask
);

router.delete(
  "/:id",
  [param("id").isInt().withMessage("El ID debe ser un número entero"), validateFields],
  deleteTask
);

export default router;
