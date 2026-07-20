import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getCasinoReviews = async (req: Request, res: Response) => {
  try {
    const casinoId = String(req.params.casinoId);
    const reviews = await prisma.casinoReview.findMany({
      where: { casino_id: casinoId, status: 'published' },
      orderBy: { sort_order: 'asc' }
    });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching casino reviews:', error);
    res.status(500).json({ error: 'Failed to fetch casino reviews' });
  }
};

export const getCasinoReviewById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const review = await prisma.casinoReview.findUnique({
      where: { id },
      include: { casino: true }
    });
    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }
    res.json(review);
  } catch (error) {
    console.error('Error fetching casino review:', error);
    res.status(500).json({ error: 'Failed to fetch casino review' });
  }
};

export const createCasinoReview = async (req: Request, res: Response) => {
  try {
    const { casino_id, reviewer_name, reviewer_position, reviewer_experience_years, content, rating, verdict, status, sort_order } = req.body;

    if (!casino_id || !reviewer_name || !content) {
      res.status(400).json({ error: 'Missing required fields: casino_id, reviewer_name, content' });
      return;
    }

    const review = await prisma.casinoReview.create({
      data: {
        casino_id,
        reviewer_name,
        reviewer_position,
        reviewer_experience_years: reviewer_experience_years ? parseInt(reviewer_experience_years, 10) : null,
        content,
        rating: rating ? parseFloat(rating) : null,
        verdict,
        status: status || 'published',
        sort_order: sort_order ? parseInt(sort_order, 10) : 0
      }
    });

    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating casino review:', error);
    res.status(500).json({ error: 'Failed to create casino review' });
  }
};

export const updateCasinoReview = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { reviewer_name, reviewer_position, reviewer_experience_years, content, rating, verdict, status, sort_order } = req.body;

    const review = await prisma.casinoReview.update({
      where: { id },
      data: {
        reviewer_name: reviewer_name !== undefined ? reviewer_name : undefined,
        reviewer_position: reviewer_position !== undefined ? reviewer_position : undefined,
        reviewer_experience_years: reviewer_experience_years !== undefined ? (reviewer_experience_years ? parseInt(reviewer_experience_years, 10) : null) : undefined,
        content: content !== undefined ? content : undefined,
        rating: rating !== undefined ? (rating ? parseFloat(rating) : null) : undefined,
        verdict: verdict !== undefined ? verdict : undefined,
        status: status !== undefined ? status : undefined,
        sort_order: sort_order !== undefined ? parseInt(sort_order, 10) : undefined
      }
    });

    res.json(review);
  } catch (error) {
    console.error('Error updating casino review:', error);
    res.status(500).json({ error: 'Failed to update casino review' });
  }
};

export const deleteCasinoReview = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    await prisma.casinoReview.delete({
      where: { id }
    });
    res.json({ message: 'Casino review deleted successfully' });
  } catch (error) {
    console.error('Error deleting casino review:', error);
    res.status(500).json({ error: 'Failed to delete casino review' });
  }
};

export const createUserReview = async (req: Request, res: Response) => {
  try {
    const { casino_id, reviewer_name, reviewer_email, content, rating } = req.body;

    if (!casino_id || !reviewer_name || !reviewer_email || !content) {
      res.status(400).json({ error: 'Missing required fields: casino_id, reviewer_name, reviewer_email, content' });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(reviewer_email)) {
      res.status(400).json({ error: 'Invalid email format' });
      return;
    }

    const review = await prisma.casinoReview.create({
      data: {
        casino_id,
        reviewer_name,
        reviewer_position: 'User',
        content,
        rating: rating ? parseFloat(rating) : null,
        status: 'published', // User reviews are published instantly
        sort_order: 999
      }
    });

    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating user review:', error);
    res.status(500).json({ error: 'Failed to create user review' });
  }
};
