import { Router } from 'express';
import { getTags, getTagById, createTag, updateTag, deleteTag } from '../controllers/tagController';

const router = Router();

router.get('/', getTags);
router.get('/:id', getTagById);
router.post('/', createTag);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);

export default router;
