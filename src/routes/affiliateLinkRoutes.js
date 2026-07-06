"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const affiliateLinkController_1 = require("../controllers/affiliateLinkController");
const router = (0, express_1.Router)();
router.get('/', affiliateLinkController_1.getAffiliateLinks);
router.get('/:id', affiliateLinkController_1.getAffiliateLinkById);
router.post('/', affiliateLinkController_1.createAffiliateLink);
router.put('/:id', affiliateLinkController_1.updateAffiliateLink);
router.delete('/:id', affiliateLinkController_1.deleteAffiliateLink);
exports.default = router;
//# sourceMappingURL=affiliateLinkRoutes.js.map