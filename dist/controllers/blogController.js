"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlogById = exports.getBlogs = void 0;
const prisma_1 = require("../prisma");
const client_1 = require("@prisma/client");
/** Converts a title to a URL-safe base slug */
const toBaseSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
/**
 * Generates a slug that is guaranteed unique in the Blog table.
 * If the base slug is taken it appends a 6-char random suffix: "my-post-a3f9k2"
 */
const uniqueBlogSlug = async (base) => {
    const exists = await prisma_1.prisma.blog.findUnique({ where: { slug: base } });
    if (!exists)
        return base;
    const suffix = Math.random().toString(36).slice(2, 8);
    return `${base}-${suffix}`;
};
const getBlogs = async (req, res) => {
    try {
        const blogs = await prisma_1.prisma.blog.findMany({
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
        res.json(blogs);
    }
    catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getBlogs = getBlogs;
const getBlogById = async (req, res) => {
    try {
        const id = String(req.params.id);
        const blog = await prisma_1.prisma.blog.findUnique({
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
        if (!blog) {
            res.status(404).json({ error: 'Blog not found' });
            return;
        }
        res.json(blog);
    }
    catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getBlogById = getBlogById;
const createBlog = async (req, res) => {
    try {
        const { title, slug, featured_image, excerpt, content, meta_title, meta_description, status, author_id } = req.body;
        if (!title || !content) {
            res.status(400).json({ error: 'Missing required fields: title, content' });
            return;
        }
        const baseSlug = slug ? toBaseSlug(slug) : toBaseSlug(title);
        const resolvedSlug = await uniqueBlogSlug(baseSlug);
        const blog = await prisma_1.prisma.blog.create({
            data: {
                title,
                slug: resolvedSlug,
                featured_image: featured_image || null,
                excerpt: excerpt || null,
                content,
                meta_title: meta_title || null,
                meta_description: meta_description || null,
                status: status || 'draft',
                author_id: author_id || null,
                published_at: status === 'published' ? new Date() : null,
            },
        });
        res.status(201).json(blog);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            res.status(409).json({ error: 'A blog post with this slug already exists. Please use a different title or slug.' });
            return;
        }
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createBlog = createBlog;
const updateBlog = async (req, res) => {
    try {
        const id = String(req.params.id);
        const { title, slug, featured_image, excerpt, content, meta_title, meta_description, status } = req.body;
        const blog = await prisma_1.prisma.blog.update({
            where: { id },
            data: {
                title,
                slug,
                featured_image,
                excerpt,
                content,
                meta_title,
                meta_description,
                status,
                published_at: status === 'published' && !req.body.published_at ? new Date() : undefined,
            },
        });
        res.json(blog);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            res.status(409).json({ error: 'A blog post with this slug already exists.' });
            return;
        }
        console.error('Error updating blog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res) => {
    try {
        const id = String(req.params.id);
        await prisma_1.prisma.blog.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteBlog = deleteBlog;
//# sourceMappingURL=blogController.js.map