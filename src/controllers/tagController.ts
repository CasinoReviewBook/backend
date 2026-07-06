import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getTags = async (req: Request, res: Response): Promise<void> => {
  try {
    const tags = await prisma.casinoTag.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTagById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const tag = await prisma.casinoTag.findUnique({
      where: { id },
    });
    if (!tag) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }
    res.json(tag);
  } catch (error) {
    console.error('Error fetching tag:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      res.status(400).json({ error: 'Missing required fields: name, slug' });
      return;
    }

    const tag = await prisma.casinoTag.create({
      data: {
        name,
        slug,
      },
    });
    res.status(201).json(tag);
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { name, slug } = req.body;

    const tag = await prisma.casinoTag.update({
      where: { id },
      data: {
        name,
        slug,
      },
    });
    res.json(tag);
  } catch (error) {
    console.error('Error updating tag:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.casinoTag.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
