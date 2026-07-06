import { Router } from 'express';
import { getAffiliateLinks, getAffiliateLinkById, createAffiliateLink, updateAffiliateLink, deleteAffiliateLink } from '../controllers/affiliateLinkController';

const router = Router();
router.get('/', getAffiliateLinks);
router.get('/:id', getAffiliateLinkById);
router.post('/', createAffiliateLink);
router.put('/:id', updateAffiliateLink);
router.delete('/:id', deleteAffiliateLink);
export default router;
