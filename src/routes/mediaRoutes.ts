import { Router } from 'express';
import multer from 'multer';
import { getMedia, getMediaById, uploadMedia, updateMedia, deleteMedia } from '../controllers/mediaController';

const router = Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});

router.get('/', getMedia);
router.get('/:id', getMediaById);
router.post('/upload', upload.single('file'), uploadMedia);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);

export default router;
