import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const settings = await prisma.siteSetting.findUnique({
      where: { id: 1 },
    });
    if (!settings) {
      res.json({
        id: 1,
        site_name: '',
        site_logo: '',
        favicon: '',
        contact_email: '',
        footer_text: '',
        facebook_url: '',
        twitter_url: '',
        instagram_url: '',
        maintenance_mode: false,
      });
      return;
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { site_name, site_logo, favicon, contact_email, footer_text, facebook_url, twitter_url, instagram_url, maintenance_mode } = req.body;
    const settings = await prisma.siteSetting.upsert({
      where: { id: 1 },
      update: {
        site_name,
        site_logo,
        favicon,
        contact_email,
        footer_text,
        facebook_url,
        twitter_url,
        instagram_url,
        maintenance_mode,
      },
      create: {
        id: 1,
        site_name,
        site_logo,
        favicon,
        contact_email,
        footer_text,
        facebook_url,
        twitter_url,
        instagram_url,
        maintenance_mode,
      },
    });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
