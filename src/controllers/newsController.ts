import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';

/** Converts a title to a URL-safe base slug */
const toBaseSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/**
 * Generates a slug that is guaranteed unique in the News table.
 * If the base slug is taken it appends a 6-char random suffix: "my-article-a3f9k2"
 */
const uniqueNewsSlug = async (base: string): Promise<string> => {
  const exists = await prisma.news.findUnique({ where: { slug: base } });
  if (!exists) return base;
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base}-${suffix}`;
};

export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const news = await prisma.news.findMany({
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
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getNewsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const identifier = String(req.params.id);
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
    
    const news = await prisma.news.findFirst({
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
    if (!news) {
      res.status(404).json({ error: 'News not found' });
      return;
    }
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, slug, featured_image, content, meta_title, meta_description, status, author_id } = req.body;

    if (!title || !content) {
      res.status(400).json({ error: 'Missing required fields: title, content' });
      return;
    }

    const baseSlug = slug ? toBaseSlug(slug) : toBaseSlug(title);
    const resolvedSlug = await uniqueNewsSlug(baseSlug);

    const news = await prisma.news.create({
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      res.status(409).json({ error: 'A news article with this slug already exists. Please use a different title or slug.' });
      return;
    }
    console.error('Error creating news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { title, slug, featured_image, content, meta_title, meta_description, status } = req.body;

    const news = await prisma.news.update({
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      res.status(409).json({ error: 'A news article with this slug already exists.' });
      return;
    }
    console.error('Error updating news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.news.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getNewsSlugs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const news = await prisma.news.findMany({
      select: {
        slug: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    res.json(news);
  } catch (error) {
    console.error('Error fetching news slugs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateNewsRanking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rankings } = req.body;
    
    if (!Array.isArray(rankings)) {
      res.status(400).json({ error: 'Invalid rankings data' });
      return;
    }

    await prisma.$transaction(
      rankings.map((ranking: { id: string; sort_order: number }) =>
        prisma.news.update({
          where: { id: ranking.id },
          data: { sort_order: ranking.sort_order }
        })
      )
    );

    res.json({ message: 'Rankings updated successfully' });
  } catch (error) {
    console.error('Error updating news rankings:', error);
    res.status(500).json({ error: 'Failed to update rankings' });
  }
};

export const updateNewsPosition = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { position } = req.body;

    if (position !== 'top' && position !== 'bottom') {
      res.status(400).json({ error: 'Invalid position. Must be "top" or "bottom"' });
      return;
    }

    const newsItem = await prisma.news.findUnique({
      where: { id }
    });

    if (!newsItem) {
      res.status(404).json({ error: 'News not found' });
      return;
    }

    const allNews = await prisma.news.findMany({
      orderBy: { sort_order: 'asc' }
    });

    let newSortOrder: number;
    if (position === 'top') {
      newSortOrder = Math.min(...allNews.map(n => n.sort_order || 0)) - 1;
    } else {
      newSortOrder = Math.max(...allNews.map(n => n.sort_order || 0)) + 1;
    }

    await prisma.news.update({
      where: { id },
      data: { sort_order: newSortOrder }
    });

    res.json({ message: 'Position updated successfully' });
  } catch (error) {
    console.error('Error updating news position:', error);
    res.status(500).json({ error: 'Failed to update position' });
  }
};