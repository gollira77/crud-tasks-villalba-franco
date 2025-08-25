import { Router } from "express";
import { body, param } from "express-validator";
import {createTag, getAllTags, getTagById, updateTag, deleteTag } from "../controllers/tag.controllers.js";
import { validateFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("El nombre es obligatorio").isLength({ max: 50 }),
    validateFields,
  ],
  createTag
);

router.get("/", getAllTags);

router.get(
  "/:id",
  [param("id").isInt().withMessage("El ID debe ser un número entero"), validateFields],
  getTagById
);

router.put(
  "/:id",
  [
    param("id").isInt().withMessage("El ID debe ser un número entero"),
    body("name").optional().isLength({ max: 50 }),
    validateFields,
  ],
  updateTag
);

router.delete(
  "/:id",
  [param("id").isInt().withMessage("El ID debe ser un número entero"), validateFields],
  deleteTag
);

export default router;
