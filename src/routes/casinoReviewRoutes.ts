import { Router } from 'express';
import {
  getCasinoReviews,
  getCasinoReviewById,
  createCasinoReview,
  updateCasinoReview,
  deleteCasinoReview,
  createUserReview
} from '../controllers/casinoReviewController';

const router = Router();

// Public routes
router.get('/casino/:casinoId', getCasinoReviews);
router.post('/user', createUserReview);

// Admin routes
router.get('/:id', getCasinoReviewById);
router.post('/', createCasinoReview);
router.put('/:id', updateCasinoReview);
router.delete('/:id', deleteCasinoReview);

export default router;
