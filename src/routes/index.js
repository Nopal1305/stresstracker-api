import { Router } from 'express';
import checkins from '../services/checkins/routes/index.js';
import users from '../services/users/routes/index.js';
import authentications from '../services/authentications/routes/index.js';

const router = Router();

router.use('/', checkins);
router.use('/', users);
router.use('/', authentications);

export default router;