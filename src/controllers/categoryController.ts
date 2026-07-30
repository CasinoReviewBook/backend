import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.casinoCategory.findMany({
      orderBy: { sort_order: 'asc' },
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

export const updateCategoryRanking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rankings } = req.body;
    
    if (!Array.isArray(rankings)) {
      res.status(400).json({ error: 'Invalid rankings data' });
      return;
    }

    await prisma.$transaction(
      rankings.map((ranking: { id: string; sort_order: number }) =>
        prisma.casinoCategory.update({
          where: { id: ranking.id },
          data: { sort_order: ranking.sort_order }
        })
      )
    );

    res.json({ message: 'Rankings updated successfully' });
  } catch (error) {
    console.error('Error updating category rankings:', error);
    res.status(500).json({ error: 'Failed to update rankings' });
  }
};

export const updateCategoryPosition = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { position } = req.body;

    if (position !== 'top' && position !== 'bottom') {
      res.status(400).json({ error: 'Invalid position. Must be "top" or "bottom"' });
      return;
    }

    const category = await prisma.casinoCategory.findUnique({
      where: { id }
    });

    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    const allCategories = await prisma.casinoCategory.findMany({
      orderBy: { sort_order: 'asc' }
    });

    let newSortOrder: number;
    if (position === 'top') {
      newSortOrder = Math.min(...allCategories.map(c => c.sort_order || 0)) - 1;
    } else {
      newSortOrder = Math.max(...allCategories.map(c => c.sort_order || 0)) + 1;
    }

    await prisma.casinoCategory.update({
      where: { id },
      data: { sort_order: newSortOrder }
    });

    res.json({ message: 'Position updated successfully' });
  } catch (error) {
    console.error('Error updating category position:', error);
    res.status(500).json({ error: 'Failed to update position' });
  }
};
