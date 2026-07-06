"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAffiliateLink = exports.updateAffiliateLink = exports.createAffiliateLink = exports.getAffiliateLinkById = exports.getAffiliateLinks = void 0;
const prisma_1 = require("../prisma");
const getAffiliateLinks = async (req, res) => {
    try {
        const links = await prisma_1.prisma.affiliateLink.findMany({
            include: {
                casino: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });
        res.json(links);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAffiliateLinks = getAffiliateLinks;
const getAffiliateLinkById = async (req, res) => {
    try {
        const id = String(req.params.id);
        const link = await prisma_1.prisma.affiliateLink.findUnique({
            where: { id },
            include: {
                casino: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });
        if (!link) {
            res.status(404).json({ error: 'Affiliate link not found' });
            return;
        }
        res.json(link);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAffiliateLinkById = getAffiliateLinkById;
const createAffiliateLink = async (req, res) => {
    try {
        const { title, casino_id, affiliate_url, button_text, status } = req.body;
        if (!title || !affiliate_url) {
            res.status(400).json({ error: 'Missing required fields: title, affiliate_url' });
            return;
        }
        const link = await prisma_1.prisma.affiliateLink.create({
            data: {
                title, casino_id, affiliate_url, button_text,
                status: status !== undefined ? status : true,
            },
        });
        res.status(201).json(link);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createAffiliateLink = createAffiliateLink;
const updateAffiliateLink = async (req, res) => {
    try {
        const id = String(req.params.id);
        const { title, casino_id, affiliate_url, button_text, status } = req.body;
        const link = await prisma_1.prisma.affiliateLink.update({
            where: { id },
            data: { title, casino_id, affiliate_url, button_text, status },
        });
        res.json(link);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateAffiliateLink = updateAffiliateLink;
const deleteAffiliateLink = async (req, res) => {
    try {
        const id = String(req.params.id);
        await prisma_1.prisma.affiliateLink.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteAffiliateLink = deleteAffiliateLink;
//# sourceMappingURL=affiliateLinkController.js.map