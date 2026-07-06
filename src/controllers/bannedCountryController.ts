import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getBannedCountries = async (req: Request, res: Response): Promise<void> => {
  try {
    const countries = await prisma.bannedCountry.findMany({
      orderBy: { country_name: 'asc' },
    });
    res.json(countries);
  } catch (error) {
    console.error('Error fetching banned countries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBannedCountryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const country = await prisma.bannedCountry.findUnique({ where: { id } });
    if (!country) {
      res.status(404).json({ error: 'Banned country not found' });
      return;
    }
    res.json(country);
  } catch (error) {
    console.error('Error fetching banned country:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createBannedCountry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { country_code, country_name } = req.body;
    if (!country_code || !country_name) {
      res.status(400).json({ error: 'Missing required fields: country_code, country_name' });
      return;
    }
    const country = await prisma.bannedCountry.create({
      data: { country_code: country_code.toUpperCase(), country_name },
    });
    res.status(201).json(country);
  } catch (error) {
    console.error('Error creating banned country:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBannedCountry = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { country_code, country_name } = req.body;
    const country = await prisma.bannedCountry.update({
      where: { id },
      data: { country_code: country_code?.toUpperCase(), country_name },
    });
    res.json(country);
  } catch (error) {
    console.error('Error updating banned country:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBannedCountry = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.bannedCountry.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting banned country:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
