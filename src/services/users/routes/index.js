import express from 'express';
import { registerUser, verifyOTP, getUserProfile, forgotPassword, resetPassword, changePassword, editProfile, saveFcmToken, saveReminderTime } from '../controller/user-controller.js';
import validate from '../../../middleware/validate.js';
import authenticateToken from '../../../middleware/auth.js';
import { UserRegistrationSchema, VerifyOTPSchema, ForgotPasswordSchema, ResetPasswordSchema, ChangePasswordSchema, EditProfileSchema } from '../validator/schema.js';

const router = express.Router();

router.post('/register', validate(UserRegistrationSchema), registerUser);
router.post('/verify-otp', validate(VerifyOTPSchema), verifyOTP);
router.get('/me', authenticateToken, getUserProfile);
router.post('/forgot-password', validate(ForgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(ResetPasswordSchema), resetPassword);
router.put('/change-password', authenticateToken, validate(ChangePasswordSchema), changePassword);
router.put('/me/change', authenticateToken, validate(EditProfileSchema), editProfile);
router.put('/users/fcm-token', authenticateToken, saveFcmToken);
router.put('/users/reminder', authenticateToken, saveReminderTime);

export default router;