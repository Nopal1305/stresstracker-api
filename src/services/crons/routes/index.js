import express from 'express';
import { triggerReminders } from '../controller/cron-controller.js';

const router = express.Router();

router.get('/cron/trigger-reminders', triggerReminders);

export default router;