"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const emailTemplate_1 = require("../src/services/emailTemplate");
(0, node_test_1.default)('wraps message content in a polished email layout', () => {
    const html = (0, emailTemplate_1.buildProfessionalEmailHtml)('Welcome', 'Hello there', 'CasinoLab');
    strict_1.default.match(html, /<!doctype html>/i);
    strict_1.default.match(html, /CasinoLab/i);
    strict_1.default.match(html, /Welcome/i);
    strict_1.default.match(html, /Hello there/i);
});
//# sourceMappingURL=emailTemplate.test.js.map