import { Router } from 'express';
import { getNews, getNewsById, createNews, updateNews, deleteNews } from '../controllers/newsController';

const router = Router();

router.get('/', getNews);
router.get('/:id', getNewsById);
router.post('/', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

export default router;
