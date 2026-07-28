import express from 'express';
import {
  getCasinoAffiliateLinks,
  createCasinoAffiliateLink,
  updateCasinoAffiliateLink,
  deleteCasinoAffiliateLink,
  getAffiliateLinkByCountry
} from '../controllers/casinoAffiliateLinkController';

const router = express.Router();

// Admin routes
router.get('/casino/:casinoId', getCasinoAffiliateLinks);
router.post('/', createCasinoAffiliateLink);
router.put('/:id', updateCasinoAffiliateLink);
router.delete('/:id', deleteCasinoAffiliateLink);

// Public route for frontend
router.get('/casino/:casinoId/country/:countryCode', getAffiliateLinkByCountry);

export default router;
