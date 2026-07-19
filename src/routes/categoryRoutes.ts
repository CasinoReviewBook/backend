import { Router } from 'express';
import { getCategories, getCategoryById, getCategoryBySlug, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController';

const router = Router();

router.get('/', getCategories);
// Slug-based route must come before /:id to avoid conflicts
router.get('/slug/:slug', getCategoryBySlug);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
