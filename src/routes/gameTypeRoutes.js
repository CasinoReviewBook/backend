"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gameTypeController_1 = require("../controllers/gameTypeController");
const router = express_1.default.Router();
router.get('/', gameTypeController_1.getGameTypes);
router.get('/:id', gameTypeController_1.getGameType);
router.post('/', gameTypeController_1.createGameType);
router.put('/:id', gameTypeController_1.updateGameType);
router.delete('/:id', gameTypeController_1.deleteGameType);
exports.default = router;
//# sourceMappingURL=gameTypeRoutes.js.map