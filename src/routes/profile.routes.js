import { Router } from "express";
import { createProfile, getAllProfiles} from "../controllers/profile.controllers.js";

const router = Router();

router.post("/", createProfile);
router.get("/", getAllProfiles); 

export default router;
