import { Router } from 'express';
import { getCategories, getCategoryById, getCategoryBySlug, createCategory, updateCategory, deleteCategory, updateCategoryRanking, updateCategoryPosition } from '../controllers/categoryController';

const router = Router();

router.get('/', getCategories);
// Slug-based route must come before /:id to avoid conflicts
router.get('/slug/:slug', getCategoryBySlug);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.put('/ranking/bulk', updateCategoryRanking);
router.put('/:id/position', updateCategoryPosition);

export default router;
