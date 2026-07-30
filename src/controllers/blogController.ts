import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';

/** Converts a title to a URL-safe base slug */
const toBaseSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/**
 * Generates a slug that is guaranteed unique in the Blog table.
 * If the base slug is taken it appends a 6-char random suffix: "my-post-a3f9k2"
 */
const uniqueBlogSlug = async (base: string): Promise<string> => {
  const exists = await prisma.blog.findUnique({ where: { slug: base } });
  if (!exists) return base;
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base}-${suffix}`;
};

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { sort_order: 'asc' },
    });
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const identifier = String(req.params.id);
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
    
    const blog = await prisma.blog.findFirst({
      where: isUUID ? { id: identifier } : { slug: identifier },
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
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, slug, featured_image, excerpt, content, meta_title, meta_description, status, author_id } = req.body;

    if (!title || !content) {
      res.status(400).json({ error: 'Missing required fields: title, content' });
      return;
    }

    const baseSlug = slug ? toBaseSlug(slug) : toBaseSlug(title);
    const resolvedSlug = await uniqueBlogSlug(baseSlug);

    const blog = await prisma.blog.create({
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      res.status(409).json({ error: 'A blog post with this slug already exists. Please use a different title or slug.' });
      return;
    }
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { title, slug, featured_image, excerpt, content, meta_title, meta_description, status } = req.body;

    const blog = await prisma.blog.update({
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      res.status(409).json({ error: 'A blog post with this slug already exists.' });
      return;
    }
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.blog.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBlogRanking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rankings } = req.body;
    
    if (!Array.isArray(rankings)) {
      res.status(400).json({ error: 'Invalid rankings data' });
      return;
    }

    await prisma.$transaction(
      rankings.map((ranking: { id: string; sort_order: number }) =>
        prisma.blog.update({
          where: { id: ranking.id },
          data: { sort_order: ranking.sort_order }
        })
      )
    );

    res.json({ message: 'Rankings updated successfully' });
  } catch (error) {
    console.error('Error updating blog rankings:', error);
    res.status(500).json({ error: 'Failed to update rankings' });
  }
};

export const updateBlogPosition = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { position } = req.body;

    if (position !== 'top' && position !== 'bottom') {
      res.status(400).json({ error: 'Invalid position. Must be "top" or "bottom"' });
      return;
    }

    const blog = await prisma.blog.findUnique({
      where: { id }
    });

    if (!blog) {
      res.status(404).json({ error: 'Blog not found' });
      return;
    }

    const allBlogs = await prisma.blog.findMany({
      orderBy: { sort_order: 'asc' }
    });

    let newSortOrder: number;
    if (position === 'top') {
      newSortOrder = Math.min(...allBlogs.map(b => b.sort_order || 0)) - 1;
    } else {
      newSortOrder = Math.max(...allBlogs.map(b => b.sort_order || 0)) + 1;
    }

    await prisma.blog.update({
      where: { id },
      data: { sort_order: newSortOrder }
    });

    res.json({ message: 'Position updated successfully' });
  } catch (error) {
    console.error('Error updating blog position:', error);
    res.status(500).json({ error: 'Failed to update position' });
  }
};
