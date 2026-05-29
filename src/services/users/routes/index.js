import express from 'express';
import { registerUser, getUserProfile } from '../controller/user-controller.js';
import validate from '../../../middleware/validate.js';
import authenticateToken from '../../../middleware/auth.js';
import { UserRegistrationSchema } from '../validator/schema.js';

const router = express.Router();

router.post('/register', validate(UserRegistrationSchema), registerUser);
router.get('/me', authenticateToken, getUserProfile);

export default router;