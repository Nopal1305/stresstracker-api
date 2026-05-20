import { Router } from "express";
import checkins from '../services/checkins/routes/index.js';

const router = Router();

router.use('/', checkins);

export default router;