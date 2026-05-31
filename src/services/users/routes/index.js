import express from 'express';
import { registerUser, verifyOTP, getUserProfile } from '../controller/user-controller.js';
import validate from '../../../middleware/validate.js';
import authenticateToken from '../../../middleware/auth.js';
import { UserRegistrationSchema, VerifyOTPSchema } from '../validator/schema.js';

const router = express.Router();

router.post('/register', validate(UserRegistrationSchema), registerUser);
router.post('/verify-otp', validate(VerifyOTPSchema), verifyOTP);
router.get('/me', authenticateToken, getUserProfile);

export default router;