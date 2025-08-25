import { Router } from "express";
import { body, param } from "express-validator";
import {createProject, getAllProjects, getProjectById, updateProject, deleteProject} from "../controllers/project.controllers.js";
import { validateFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("El nombre es obligatorio").isLength({ max: 100 }),
    body("userId").isInt().withMessage("El userId debe ser un número entero"),
    body("description").optional().isLength({ max: 255 }),
    validateFields,
  ],
  createProject
);

router.get("/", getAllProjects);

router.get(
  "/:id",
  [param("id").isInt().withMessage("El ID debe ser un número entero"), validateFields],
  getProjectById
);

router.put(
  "/:id",
  [
    param("id").isInt().withMessage("El ID debe ser un número entero"),
    body("name").optional().isLength({ max: 100 }),
    body("description").optional().isLength({ max: 255 }),
    body("deadline").optional().isISO8601().toDate(),
    body("userId").optional().isInt(),
    validateFields,
  ],
  updateProject
);

router.delete(
  "/:id",
  [param("id").isInt().withMessage("El ID debe ser un número entero"), validateFields],
  deleteProject
);

export default router;
