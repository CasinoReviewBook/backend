"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRegion = exports.updateRegion = exports.createRegion = exports.getRegionById = exports.getRegions = void 0;
const prisma_1 = require("../prisma");
const getRegions = async (req, res) => {
    try {
        const regions = await prisma_1.prisma.region.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: { countries: true }
                }
            }
        });
        res.json(regions);
    }
    catch (error) {
        console.error('Error fetching regions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getRegions = getRegions;
const getRegionById = async (req, res) => {
    try {
        const id = String(req.params.id);
        const region = await prisma_1.prisma.region.findUnique({
            where: { id },
            include: {
                countries: true
            }
        });
        if (!region) {
            res.status(404).json({ error: 'Region not found' });
            return;
        }
        res.json(region);
    }
    catch (error) {
        console.error('Error fetching region:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getRegionById = getRegionById;
const createRegion = async (req, res) => {
    try {
        const { name, slug } = req.body;
        if (!name || !slug) {
            res.status(400).json({ error: 'Missing required fields: name, slug' });
            return;
        }
        const region = await prisma_1.prisma.region.create({
            data: {
                name,
                slug,
            },
        });
        res.status(201).json(region);
    }
    catch (error) {
        console.error('Error creating region:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createRegion = createRegion;
const updateRegion = async (req, res) => {
    try {
        const id = String(req.params.id);
        const { name, slug } = req.body;
        const region = await prisma_1.prisma.region.update({
            where: { id },
            data: {
                name,
                slug,
            },
        });
        res.json(region);
    }
    catch (error) {
        console.error('Error updating region:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateRegion = updateRegion;
const deleteRegion = async (req, res) => {
    try {
        const id = String(req.params.id);
        await prisma_1.prisma.region.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting region:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteRegion = deleteRegion;
//# sourceMappingURL=regionController.js.map