"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const mediaController_1 = require("../controllers/mediaController");
const router = (0, express_1.Router)();
// Configure multer for memory storage
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
    },
});
router.get('/', mediaController_1.getMedia);
router.get('/:id', mediaController_1.getMediaById);
router.post('/upload', upload.single('file'), mediaController_1.uploadMedia);
router.put('/:id', mediaController_1.updateMedia);
router.delete('/:id', mediaController_1.deleteMedia);
exports.default = router;
//# sourceMappingURL=mediaRoutes.js.map