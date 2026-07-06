import { Router } from 'express';
import { getCountries, getCountryById, createCountry, updateCountry, deleteCountry } from '../controllers/countryController';

const router = Router();

router.get('/', getCountries);
router.get('/:id', getCountryById);
router.post('/', createCountry);
router.put('/:id', updateCountry);
router.delete('/:id', deleteCountry);

export default router;
