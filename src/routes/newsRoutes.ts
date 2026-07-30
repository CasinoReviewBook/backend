import { Router } from 'express';
import { getNews, getNewsById, createNews, updateNews, deleteNews, getNewsSlugs, updateNewsRanking, updateNewsPosition } from '../controllers/newsController';

const router = Router();

router.get('/', getNews);
router.get('/slugs', getNewsSlugs);
router.get('/:id', getNewsById);
router.post('/', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);
router.put('/ranking/bulk', updateNewsRanking);
router.put('/:id/position', updateNewsPosition);

export default router;
