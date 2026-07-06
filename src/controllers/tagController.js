"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTag = exports.updateTag = exports.createTag = exports.getTagById = exports.getTags = void 0;
const prisma_1 = require("../prisma");
const getTags = async (req, res) => {
    try {
        const tags = await prisma_1.prisma.casinoTag.findMany({
            orderBy: { name: 'asc' },
        });
        res.json(tags);
    }
    catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getTags = getTags;
const getTagById = async (req, res) => {
    try {
        const id = String(req.params.id);
        const tag = await prisma_1.prisma.casinoTag.findUnique({
            where: { id },
        });
        if (!tag) {
            res.status(404).json({ error: 'Tag not found' });
            return;
        }
        res.json(tag);
    }
    catch (error) {
        console.error('Error fetching tag:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getTagById = getTagById;
const createTag = async (req, res) => {
    try {
        const { name, slug } = req.body;
        if (!name || !slug) {
            res.status(400).json({ error: 'Missing required fields: name, slug' });
            return;
        }
        const tag = await prisma_1.prisma.casinoTag.create({
            data: {
                name,
                slug,
            },
        });
        res.status(201).json(tag);
    }
    catch (error) {
        console.error('Error creating tag:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createTag = createTag;
const updateTag = async (req, res) => {
    try {
        const id = String(req.params.id);
        const { name, slug } = req.body;
        const tag = await prisma_1.prisma.casinoTag.update({
            where: { id },
            data: {
                name,
                slug,
            },
        });
        res.json(tag);
    }
    catch (error) {
        console.error('Error updating tag:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateTag = updateTag;
const deleteTag = async (req, res) => {
    try {
        const id = String(req.params.id);
        await prisma_1.prisma.casinoTag.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting tag:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteTag = deleteTag;
//# sourceMappingURL=tagController.js.map