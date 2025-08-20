import { Router } from 'express';
import { createUser, getAllUsers, getUserById } from '../controllers/user.controllers.js';
const router = Router();

router.post('/', createUser);       
router.get('/', getAllUsers);      
router.get('/:id', getUserById);  


export default router;
