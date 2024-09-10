"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.default)();
router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/auth/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: '/auth/google/unauthorized',
    successRedirect: '/api/contacts',
}));
router.get('/auth/google/unauthorized', (req, res) => res.sendStatus(401));
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.sendStatus(500);
        }
        req.session.destroy(() => res.redirect('/'));
    });
});
exports.default = router;
//# sourceMappingURL=auth.router.js.map