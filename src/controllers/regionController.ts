import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getRegions = async (req: Request, res: Response): Promise<void> => {
  try {
    const regions = await prisma.region.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { countries: true }
        }
      }
    });
    res.json(regions);
  } catch (error) {
    console.error('Error fetching regions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRegionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const region = await prisma.region.findUnique({
      where: { id },
      include: {
        countries: true
      }
    });
    if (!region) {
      res.status(404).json({ error: 'Region not found' });
      return;
    }
    res.json(region);
  } catch (error) {
    console.error('Error fetching region:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createRegion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      res.status(400).json({ error: 'Missing required fields: name, slug' });
      return;
    }

    const region = await prisma.region.create({
      data: {
        name,
        slug,
      },
    });
    res.status(201).json(region);
  } catch (error) {
    console.error('Error creating region:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateRegion = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { name, slug } = req.body;

    const region = await prisma.region.update({
      where: { id },
      data: {
        name,
        slug,
      },
    });
    res.json(region);
  } catch (error) {
    console.error('Error updating region:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteRegion = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.region.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting region:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
