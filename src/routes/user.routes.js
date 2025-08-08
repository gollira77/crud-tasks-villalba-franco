import { Router } from 'express';
import { createUser, getAllUsers } from '../controllers/user.controllers.js';

const router = Router();

router.post('/api/users', createUser);
router.get('/api/users', getAllUsers);

export default router;
