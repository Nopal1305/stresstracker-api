import express from 'express';
import { addCheckin } from '../controller/checkin-controller.js';

const router = express.Router();

router.post('/checkins', addCheckin);

export default router;