import express from 'express';
import {
  getGameTypes,
  getGameType,
  createGameType,
  updateGameType,
  deleteGameType
} from '../controllers/gameTypeController';

const router = express.Router();

router.get('/', getGameTypes);
router.get('/:id', getGameType);
router.post('/', createGameType);
router.put('/:id', updateGameType);
router.delete('/:id', deleteGameType);

export default router;
