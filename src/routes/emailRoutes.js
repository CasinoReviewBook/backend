"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailController_1 = require("../controllers/emailController");
const router = (0, express_1.Router)();
router.post('/send', emailController_1.createAndSendCampaign);
router.get('/', emailController_1.getCampaigns);
router.get('/:id', emailController_1.getCampaignById);
router.put('/:id', emailController_1.updateCampaign);
router.delete('/:id', emailController_1.deleteCampaign);
exports.default = router;
//# sourceMappingURL=emailRoutes.js.map