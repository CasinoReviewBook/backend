import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.casinoCategory.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCategoryBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = String(req.params.slug);
    const category = await prisma.casinoCategory.findFirst({
      where: { slug },
    });
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    // Fetch all active casinos that belong to this category
    const casinos = await prisma.casino.findMany({
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
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const category = await prisma.casinoCategory.findUnique({
      where: { id },
    });
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      res.status(400).json({ error: 'Missing required fields: name, slug' });
      return;
    }

    const category = await prisma.casinoCategory.create({
      data: {
        name,
        slug,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { name, slug } = req.body;

    const category = await prisma.casinoCategory.update({
      where: { id },
      data: {
        name,
        slug,
      },
    });
    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.casinoCategory.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
