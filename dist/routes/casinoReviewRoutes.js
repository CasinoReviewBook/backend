"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const casinoReviewController_1 = require("../controllers/casinoReviewController");
const router = (0, express_1.Router)();
// Public routes
router.get('/casino/:casinoId', casinoReviewController_1.getCasinoReviews);
router.post('/user', casinoReviewController_1.createUserReview);
// Admin routes
router.get('/:id', casinoReviewController_1.getCasinoReviewById);
router.post('/', casinoReviewController_1.createCasinoReview);
router.put('/:id', casinoReviewController_1.updateCasinoReview);
router.delete('/:id', casinoReviewController_1.deleteCasinoReview);
exports.default = router;
//# sourceMappingURL=casinoReviewRoutes.js.map