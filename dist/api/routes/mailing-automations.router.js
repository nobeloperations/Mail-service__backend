"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
router.get('mailing-automations');
router.post('mailing-automations');
router.get('mailing-automations/:id');
router.put('mailing-automations/:id');
router.delete('mailing-automations/:id');
router.post('mailing-automations/:id/add-contacts');
router.post('mailing-automations/:id/remove-contacts');
exports.default = router;
//# sourceMappingURL=mailing-automations.router.js.map