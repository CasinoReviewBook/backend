import { Router } from 'express';
import { getLogs, deleteLog } from '../controllers/logsController';

const router = Router();
router.get('/', getLogs);
router.delete('/:id', deleteLog);
export default router;
