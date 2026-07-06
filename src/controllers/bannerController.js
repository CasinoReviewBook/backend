"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBanner = exports.updateBanner = exports.createBanner = exports.getBannerById = exports.getBanners = void 0;
const prisma_1 = require("../prisma");
const getBanners = async (req, res) => {
    try {
        const banners = await prisma_1.prisma.banner.findMany({ orderBy: { created_at: 'desc' } });
        res.json(banners);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getBanners = getBanners;
const getBannerById = async (req, res) => {
    try {
        const id = String(req.params.id);
        const banner = await prisma_1.prisma.banner.findUnique({ where: { id } });
        if (!banner) {
            res.status(404).json({ error: 'Banner not found' });
            return;
        }
        res.json(banner);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getBannerById = getBannerById;
const createBanner = async (req, res) => {
    try {
        const { title, image_url, redirect_url, position, status, start_date, end_date } = req.body;
        if (!title || !image_url) {
            res.status(400).json({ error: 'Missing required fields: title, image_url' });
            return;
        }
        const banner = await prisma_1.prisma.banner.create({
            data: {
                title, image_url, redirect_url, position,
                status: status !== undefined ? status : true,
                start_date: start_date ? new Date(start_date) : null,
                end_date: end_date ? new Date(end_date) : null,
            },
        });
        res.status(201).json(banner);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createBanner = createBanner;
const updateBanner = async (req, res) => {
    try {
        const id = String(req.params.id);
        const { title, image_url, redirect_url, position, status, start_date, end_date } = req.body;
        const banner = await prisma_1.prisma.banner.update({
            where: { id },
            data: {
                title, image_url, redirect_url, position, status,
                start_date: start_date ? new Date(start_date) : null,
                end_date: end_date ? new Date(end_date) : null,
            },
        });
        res.json(banner);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateBanner = updateBanner;
const deleteBanner = async (req, res) => {
    try {
        const id = String(req.params.id);
        await prisma_1.prisma.banner.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteBanner = deleteBanner;
//# sourceMappingURL=bannerController.js.map