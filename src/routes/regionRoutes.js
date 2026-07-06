"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const regionController_1 = require("../controllers/regionController");
const router = (0, express_1.Router)();
router.get('/', regionController_1.getRegions);
router.get('/:id', regionController_1.getRegionById);
router.post('/', regionController_1.createRegion);
router.put('/:id', regionController_1.updateRegion);
router.delete('/:id', regionController_1.deleteRegion);
exports.default = router;
//# sourceMappingURL=regionRoutes.js.map