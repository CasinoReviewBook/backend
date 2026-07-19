"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const casinoController_1 = require("../controllers/casinoController");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// Excel Import/Export (must come before /:id routes)
router.get('/export/excel', casinoController_1.exportCasinos);
router.get('/export/template', casinoController_1.exportCasinosTemplate);
router.post('/import/excel', upload.single('file'), casinoController_1.importCasinos);
// Ranking (must come before /:id routes)
router.put('/ranking/bulk', casinoController_1.updateCasinoRanking);
// Position update (must come before /:id routes)
router.put('/:id/position', casinoController_1.updateCasinoPosition);
// Slug-based routes (must come before /:id routes)
router.get('/slug/:slug/similar', casinoController_1.getSimilarCasinos);
router.get('/slug/:slug', casinoController_1.getCasinoBySlug);
// Standard CRUD routes
router.get('/', casinoController_1.getCasinos);
router.get('/:id', casinoController_1.getCasino);
router.post('/', casinoController_1.createCasino);
router.put('/:id', casinoController_1.updateCasino);
router.delete('/:id', casinoController_1.deleteCasino);
exports.default = router;
//# sourceMappingURL=casinoRoutes.js.map