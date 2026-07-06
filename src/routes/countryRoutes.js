"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const countryController_1 = require("../controllers/countryController");
const router = (0, express_1.Router)();
router.get('/', countryController_1.getCountries);
router.get('/:id', countryController_1.getCountryById);
router.post('/', countryController_1.createCountry);
router.put('/:id', countryController_1.updateCountry);
router.delete('/:id', countryController_1.deleteCountry);
exports.default = router;
//# sourceMappingURL=countryRoutes.js.map