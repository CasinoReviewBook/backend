import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getBanners = async (req: Request, res: Response): Promise<void> => {
  try {
    const banners = await prisma.banner.findMany({ orderBy: { created_at: 'desc' } });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBannerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const banner = await prisma.banner.findUnique({ where: { id } });
    if (!banner) {
      res.status(404).json({ error: 'Banner not found' });
      return;
    }
    res.json(banner);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createBanner = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, image_url, redirect_url, position, status, start_date, end_date } = req.body;
    if (!title || !image_url) {
      res.status(400).json({ error: 'Missing required fields: title, image_url' });
      return;
    }
    const banner = await prisma.banner.create({
      data: {
        title, image_url, redirect_url, position,
        status: status !== undefined ? status : true,
        start_date: start_date ? new Date(start_date) : null,
        end_date: end_date ? new Date(end_date) : null,
      },
    });
    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBanner = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { title, image_url, redirect_url, position, status, start_date, end_date } = req.body;
    const banner = await prisma.banner.update({
      where: { id },
      data: {
        title, image_url, redirect_url, position, status,
        start_date: start_date ? new Date(start_date) : null,
        end_date: end_date ? new Date(end_date) : null,
      },
    });
    res.json(banner);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBanner = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.banner.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
