"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logsController_1 = require("../controllers/logsController");
const router = (0, express_1.Router)();
router.get('/', logsController_1.getLogs);
router.delete('/:id', logsController_1.deleteLog);
exports.default = router;
//# sourceMappingURL=logsRoutes.js.map