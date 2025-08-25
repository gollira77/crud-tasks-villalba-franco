import { Router } from "express";
import { body, param } from "express-validator";
import {createProfile, getAllProfiles, getProfileById, updateProfile, deleteProfile} from "../controllers/profile.controllers.js";
import { validateFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.post(
  "/",
  [
    body("userId").isInt().withMessage("El userId debe ser un número entero"),
    body("bio").optional().isLength({ max: 255 }),
    body("avatar").optional().isLength({ max: 255 }),
    validateFields,
  ],
  createProfile
);

router.get("/", getAllProfiles);

router.get(
  "/:id",
  [param("id").isInt().withMessage("El ID debe ser un número entero"), validateFields],
  getProfileById
);

router.put(
  "/:id",
  [
    param("id").isInt().withMessage("El ID debe ser un número entero"),
    body("userId").optional().isInt(),
    body("bio").optional().isLength({ max: 255 }),
    body("avatar").optional().isLength({ max: 255 }),
    validateFields,
  ],
  updateProfile
);

router.delete(
  "/:id",
  [param("id").isInt().withMessage("El ID debe ser un número entero"), validateFields],
  deleteProfile
);

export default router;
