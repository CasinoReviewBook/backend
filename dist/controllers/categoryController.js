"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getCategoryBySlug = exports.getCategories = void 0;
const prisma_1 = require("../prisma");
const getCategories = async (req, res) => {
    try {
        const categories = await prisma_1.prisma.casinoCategory.findMany({
            orderBy: { name: 'asc' },
        });
        res.json(categories);
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getCategories = getCategories;
const getCategoryBySlug = async (req, res) => {
    try {
        const slug = String(req.params.slug);
        const category = await prisma_1.prisma.casinoCategory.findFirst({
            where: { slug },
        });
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        // Fetch all active casinos that belong to this category
        const casinos = await prisma_1.prisma.casino.findMany({
            where: {
                status: 'active',
                categories: {
                    some: {
                        category_id: category.id,
                    },
                },
            },
            orderBy: { ranking_order: 'asc' },
            include: {
                bonuses: true,
                tags: {
                    include: { tag: true },
                },
                categories: {
                    include: { category: true },
                },
                badges: {
                    include: { badge: true },
                },
            },
        });
        res.json({ category, casinos });
    }
    catch (error) {
        console.error('Error fetching category by slug:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getCategoryBySlug = getCategoryBySlug;
const getCategoryById = async (req, res) => {
    try {
        const id = String(req.params.id);
        const category = await prisma_1.prisma.casinoCategory.findUnique({
            where: { id },
        });
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        res.json(category);
    }
    catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getCategoryById = getCategoryById;
const createCategory = async (req, res) => {
    try {
        const { name, slug } = req.body;
        if (!name || !slug) {
            res.status(400).json({ error: 'Missing required fields: name, slug' });
            return;
        }
        const category = await prisma_1.prisma.casinoCategory.create({
            data: {
                name,
                slug,
            },
        });
        res.status(201).json(category);
    }
    catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const id = String(req.params.id);
        const { name, slug } = req.body;
        const category = await prisma_1.prisma.casinoCategory.update({
            where: { id },
            data: {
                name,
                slug,
            },
        });
        res.json(category);
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const id = String(req.params.id);
        await prisma_1.prisma.casinoCategory.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryController.js.map