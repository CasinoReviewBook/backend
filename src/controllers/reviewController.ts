import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';

/** Converts a title to a URL-safe base slug */
const toBaseSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/**
 * Generates a slug that is guaranteed unique in the Review table.
 * If the base slug is taken it appends a 6-char random suffix: "casino-review-a3f9k2"
 */
const uniqueReviewSlug = async (base: string): Promise<string> => {
  const exists = await prisma.review.findUnique({ where: { slug: base } });
  if (!exists) return base;
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base}-${suffix}`;
};

export const getReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        casino: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
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
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getReviewById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      res.status(400).json({ error: 'Invalid ID format. Expected a valid UUID.' });
      return;
    }
    
    const review = await prisma.review.findUnique({
      where: { id },
      include: {
        casino: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }
    res.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, slug, featured_image, content, rating, casino_id, author_id, meta_title, meta_description, status } = req.body;

    if (!title || !content) {
      res.status(400).json({ error: 'Missing required fields: title, content' });
      return;
    }

    const baseSlug = slug ? toBaseSlug(slug) : toBaseSlug(title);
    const resolvedSlug = await uniqueReviewSlug(baseSlug);

    const review = await prisma.review.create({
      data: {
        title,
        slug: resolvedSlug,
        featured_image: featured_image || null,
        content,
        rating: rating || null,
        casino_id: casino_id || null,
        author_id: author_id || null,
        meta_title: meta_title || null,
        meta_description: meta_description || null,
        status: status || 'draft',
        published_at: status === 'published' ? new Date() : null,
      },
    });
    res.status(201).json(review);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      res.status(409).json({ error: 'A review with this slug already exists. Please use a different title or slug.' });
      return;
    }
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      res.status(400).json({ error: 'Invalid ID format. Expected a valid UUID.' });
      return;
    }
    
    const { title, slug, featured_image, content, rating, casino_id, meta_title, meta_description, status } = req.body;

    const review = await prisma.review.update({
      where: { id },
      data: {
        title,
        slug,
        featured_image,
        content,
        rating,
        casino_id,
        meta_title,
        meta_description,
        status,
        published_at: status === 'published' && !req.body.published_at ? new Date() : undefined,
      },
    });
    res.json(review);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      res.status(409).json({ error: 'A review with this slug already exists.' });
      return;
    }
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      res.status(400).json({ error: 'Invalid ID format. Expected a valid UUID.' });
      return;
    }
    
    await prisma.review.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
