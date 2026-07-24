import { Router } from 'express';
import { getTickets, getTicket, updateTicketStatus, deleteTicket } from '../controllers/contactTicketController';

const router = Router();

router.get('/', getTickets);
router.get('/:id', getTicket);
router.put('/:id/status', updateTicketStatus);
router.delete('/:id', deleteTicket);

export default router;
