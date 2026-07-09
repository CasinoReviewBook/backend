"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNews = exports.updateNews = exports.createNews = exports.getNewsById = exports.getNews = void 0;
const prisma_1 = require("../prisma");
const client_1 = require("@prisma/client");
/** Converts a title to a URL-safe base slug */
const toBaseSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
/**
 * Generates a slug that is guaranteed unique in the News table.
 * If the base slug is taken it appends a 6-char random suffix: "my-article-a3f9k2"
 */
const uniqueNewsSlug = async (base) => {
    const exists = await prisma_1.prisma.news.findUnique({ where: { slug: base } });
    if (!exists)
        return base;
    const suffix = Math.random().toString(36).slice(2, 8);
    return `${base}-${suffix}`;
};
const getNews = async (req, res) => {
    try {
        const news = await prisma_1.prisma.news.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });
        res.json(news);
    }
    catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getNews = getNews;
const getNewsById = async (req, res) => {
    try {
        const id = String(req.params.id);
        const news = await prisma_1.prisma.news.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!news) {
            res.status(404).json({ error: 'News not found' });
            return;
        }
        res.json(news);
    }
    catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getNewsById = getNewsById;
const createNews = async (req, res) => {
    try {
        const { title, slug, featured_image, content, meta_title, meta_description, status, author_id } = req.body;
        if (!title || !content) {
            res.status(400).json({ error: 'Missing required fields: title, content' });
            return;
        }
        const baseSlug = slug ? toBaseSlug(slug) : toBaseSlug(title);
        const resolvedSlug = await uniqueNewsSlug(baseSlug);
        const news = await prisma_1.prisma.news.create({
            data: {
                title,
                slug: resolvedSlug,
                featured_image: featured_image || null,
                content,
                meta_title: meta_title || null,
                meta_description: meta_description || null,
                status: status || 'draft',
                author_id: author_id || null,
                published_at: status === 'published' ? new Date() : null,
            },
        });
        res.status(201).json(news);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            res.status(409).json({ error: 'A news article with this slug already exists. Please use a different title or slug.' });
            return;
        }
        console.error('Error creating news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createNews = createNews;
const updateNews = async (req, res) => {
    try {
        const id = String(req.params.id);
        const { title, slug, featured_image, content, meta_title, meta_description, status } = req.body;
        const news = await prisma_1.prisma.news.update({
            where: { id },
            data: {
                title,
                slug,
                featured_image,
                content,
                meta_title,
                meta_description,
                status,
                published_at: status === 'published' && !req.body.published_at ? new Date() : undefined,
            },
        });
        res.json(news);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            res.status(409).json({ error: 'A news article with this slug already exists.' });
            return;
        }
        console.error('Error updating news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateNews = updateNews;
const deleteNews = async (req, res) => {
    try {
        const id = String(req.params.id);
        await prisma_1.prisma.news.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteNews = deleteNews;
//# sourceMappingURL=newsController.js.map