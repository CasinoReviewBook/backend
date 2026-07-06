import { Router } from 'express';
import { getBannedCountries, getBannedCountryById, createBannedCountry, updateBannedCountry, deleteBannedCountry } from '../controllers/bannedCountryController';

const router = Router();

router.get('/', getBannedCountries);
router.get('/:id', getBannedCountryById);
router.post('/', createBannedCountry);
router.put('/:id', updateBannedCountry);
router.delete('/:id', deleteBannedCountry);

export default router;
