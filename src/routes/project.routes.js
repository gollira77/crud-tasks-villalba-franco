import { Router } from "express";
import { createProject, getAllProjects } from "../controllers/project.controllers.js";

const router = Router();

router.post("/", createProject);
router.get("/", getAllProjects);

export default router;
