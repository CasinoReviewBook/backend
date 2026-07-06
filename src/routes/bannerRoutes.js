"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bannerController_1 = require("../controllers/bannerController");
const router = (0, express_1.Router)();
router.get('/', bannerController_1.getBanners);
router.get('/:id', bannerController_1.getBannerById);
router.post('/', bannerController_1.createBanner);
router.put('/:id', bannerController_1.updateBanner);
router.delete('/:id', bannerController_1.deleteBanner);
exports.default = router;
//# sourceMappingURL=bannerRoutes.js.map