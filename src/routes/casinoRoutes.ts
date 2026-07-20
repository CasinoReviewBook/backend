import { Router } from 'express';
import multer from 'multer';
import { 
  getCasinos, 
  getCasino, 
  createCasino, 
  updateCasino, 
  deleteCasino,
  exportCasinos,
  exportCasinosTemplate,
  importCasinos,
  updateCasinoRanking,
  updateCasinoPosition,
  getCasinoBySlug,
  getSimilarCasinos
} from '../controllers/casinoController';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Excel Import/Export (must come before /:id routes)
router.get('/export/excel', exportCasinos);
router.get('/export/template', exportCasinosTemplate);
router.post('/import/excel', upload.single('file'), importCasinos);

// Ranking (must come before /:id routes)
router.put('/ranking/bulk', updateCasinoRanking);

// Position update (must come before /:id routes)
router.put('/:id/position', updateCasinoPosition);

// Slug-based routes (must come before /:id routes)
router.get('/slug/:slug/similar', getSimilarCasinos);
router.get('/slug/:slug', getCasinoBySlug);

// Standard CRUD routes
router.get('/', getCasinos);
router.get('/:id', getCasino);
router.post('/', createCasino);
router.put('/:id', updateCasino);
router.delete('/:id', deleteCasino);

export default router;
