import express from 'express';
import { addCheckin, getLatestCheckin } from '../controller/checkin-controller.js';
import validate from '../../../middleware/validate.js';
import { CheckinPayloadSchema } from '../validator/schema.js';
import authenticateToken from '../../../middleware/auth.js';

const router = express.Router();

router.post('/checkins', authenticateToken, validate(CheckinPayloadSchema), addCheckin);
router.get('/checkins', authenticateToken, getLatestCheckin);

export default router;