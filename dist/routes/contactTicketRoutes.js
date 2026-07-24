"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactTicketController_1 = require("../controllers/contactTicketController");
const router = (0, express_1.Router)();
router.get('/', contactTicketController_1.getTickets);
router.get('/:id', contactTicketController_1.getTicket);
router.put('/:id/status', contactTicketController_1.updateTicketStatus);
router.delete('/:id', contactTicketController_1.deleteTicket);
exports.default = router;
//# sourceMappingURL=contactTicketRoutes.js.map