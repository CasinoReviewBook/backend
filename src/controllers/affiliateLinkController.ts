import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getAffiliateLinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const links = await prisma.affiliateLink.findMany({
      include: {
        casino: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAffiliateLinkById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const link = await prisma.affiliateLink.findUnique({
      where: { id },
      include: {
        casino: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
    if (!link) {
      res.status(404).json({ error: 'Affiliate link not found' });
      return;
    }
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createAffiliateLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, casino_id, affiliate_url, button_text, status } = req.body;
    if (!title || !affiliate_url) {
      res.status(400).json({ error: 'Missing required fields: title, affiliate_url' });
      return;
    }
    const link = await prisma.affiliateLink.create({
      data: {
        title, casino_id, affiliate_url, button_text,
        status: status !== undefined ? status : true,
      },
    });
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateAffiliateLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { title, casino_id, affiliate_url, button_text, status } = req.body;
    const link = await prisma.affiliateLink.update({
      where: { id },
      data: { title, casino_id, affiliate_url, button_text, status },
    });
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteAffiliateLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.affiliateLink.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
