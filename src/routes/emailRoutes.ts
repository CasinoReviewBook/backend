import { Router } from 'express';
import { createAndSendCampaign, getCampaigns, getCampaignById, updateCampaign, deleteCampaign } from '../controllers/emailController';

const router = Router();

router.post('/send', createAndSendCampaign);
router.get('/', getCampaigns);
router.get('/:id', getCampaignById);
router.put('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);

export default router;
