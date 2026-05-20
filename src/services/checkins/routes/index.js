import express from 'express';
import { addCheckin } from '../controller/checkin-controller.js';
import validate from '../../../middlewires/validate.js';
import { checkinPayloadSchema } from '../validator/schema.js';
const router = express.Router();

router.post('/checkins', validate(checkinPayloadSchema), addCheckin);

export default router;