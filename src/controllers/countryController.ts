import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getCountries = async (req: Request, res: Response): Promise<void> => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    // Manually fetch regions for each country
    const countriesWithRegions = await Promise.all(
      countries.map(async (country) => {
        if (country.regionId) {
          const region = await prisma.region.findUnique({
            where: { id: country.regionId }
          });
          return {
            ...country,
            region
          };
        }
        return country;
      })
    );

    console.log(JSON.stringify(countriesWithRegions, null, 2)); // Debug

    res.json(countriesWithRegions);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCountryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const country = await prisma.country.findUnique({
      where: { id },
    });

    if (!country) {
      res.status(404).json({ error: 'Country not found' });
      return;
    }

    // Manually fetch region if exists
    let region = null;
    if (country.regionId) {
      region = await prisma.region.findUnique({
        where: { id: country.regionId }
      });
    }

    res.json({ ...country, region });
  } catch (error) {
    console.error('Error fetching country:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCountry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, code, regionId } = req.body;

    if (!name || !code) {
      res.status(400).json({
        error: 'Missing required fields: name and code',
      });
      return;
    }

    const country = await prisma.country.create({
      data: {
        name,
        code,
        regionId: regionId || null,
      },
      include: {
        region: true,
      },
    });

    res.status(201).json(country);
  } catch (error) {
    console.error('Error creating country:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCountry = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { name, code, regionId } = req.body;

    const country = await prisma.country.update({
      where: { id },
      data: {
        name,
        code,
        regionId: regionId || null,
      },
    });

    // Manually fetch region if exists
    let region = null;
    if (country.regionId) {
      region = await prisma.region.findUnique({
        where: { id: country.regionId }
      });
    }

    res.json({ ...country, region });
  } catch (error) {
    console.error('Error updating country:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCountry = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    await prisma.country.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting country:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};