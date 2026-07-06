"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.getSettings = void 0;
const prisma_1 = require("../prisma");
const getSettings = async (req, res) => {
    try {
        const settings = await prisma_1.prisma.siteSetting.findUnique({
            where: { id: 1 },
        });
        if (!settings) {
            res.json({
                id: 1,
                site_name: '',
                site_logo: '',
                favicon: '',
                contact_email: '',
                footer_text: '',
                facebook_url: '',
                twitter_url: '',
                instagram_url: '',
                maintenance_mode: false,
            });
            return;
        }
        res.json(settings);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getSettings = getSettings;
const updateSettings = async (req, res) => {
    try {
        const { site_name, site_logo, favicon, contact_email, footer_text, facebook_url, twitter_url, instagram_url, maintenance_mode } = req.body;
        const settings = await prisma_1.prisma.siteSetting.upsert({
            where: { id: 1 },
            update: {
                site_name,
                site_logo,
                favicon,
                contact_email,
                footer_text,
                facebook_url,
                twitter_url,
                instagram_url,
                maintenance_mode,
            },
            create: {
                id: 1,
                site_name,
                site_logo,
                favicon,
                contact_email,
                footer_text,
                facebook_url,
                twitter_url,
                instagram_url,
                maintenance_mode,
            },
        });
        res.json(settings);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateSettings = updateSettings;
//# sourceMappingURL=settingsController.js.map