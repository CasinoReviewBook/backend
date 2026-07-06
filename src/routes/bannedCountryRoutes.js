"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bannedCountryController_1 = require("../controllers/bannedCountryController");
const router = (0, express_1.Router)();
router.get('/', bannedCountryController_1.getBannedCountries);
router.get('/:id', bannedCountryController_1.getBannedCountryById);
router.post('/', bannedCountryController_1.createBannedCountry);
router.put('/:id', bannedCountryController_1.updateBannedCountry);
router.delete('/:id', bannedCountryController_1.deleteBannedCountry);
exports.default = router;
//# sourceMappingURL=bannedCountryRoutes.js.map