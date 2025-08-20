import { Router } from "express";
import { createTag, getAllTags } from "../controllers/tag.controllers.js";

const router = Router();

router.post("/", createTag);
router.get("/", getAllTags);

export default router;
