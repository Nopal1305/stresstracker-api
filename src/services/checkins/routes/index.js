import express from 'express';
import { addCheckin, getAllCheckin } from '../controller/checkin-controller.js';
import validate from '../../../middlewires/validate.js';
import { checkinPayloadSchema } from '../validator/schema.js';
const router = express.Router();

router.post('/checkins', validate(checkinPayloadSchema), addCheckin);
router.get('/checkins', getAllCheckin);

export default router;