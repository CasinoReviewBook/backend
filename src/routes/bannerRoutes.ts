import { Router } from 'express';
import { getBanners, getBannerById, createBanner, updateBanner, deleteBanner } from '../controllers/bannerController';

const router = Router();
router.get('/', getBanners);
router.get('/:id', getBannerById);
router.post('/', createBanner);
router.put('/:id', updateBanner);
router.delete('/:id', deleteBanner);
export default router;
