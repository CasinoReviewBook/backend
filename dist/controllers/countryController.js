"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCountry = exports.updateCountry = exports.createCountry = exports.getCountryById = exports.getCountries = void 0;
const prisma_1 = require("../prisma");
const getCountries = async (req, res) => {
    try {
        const countries = await prisma_1.prisma.country.findMany({
            orderBy: {
                name: 'asc',
            },
        });
        // Manually fetch regions for each country
        const countriesWithRegions = await Promise.all(countries.map(async (country) => {
            if (country.regionId) {
                const region = await prisma_1.prisma.region.findUnique({
                    where: { id: country.regionId }
                });
                return {
                    ...country,
                    region
                };
            }
            return country;
        }));
        console.log(JSON.stringify(countriesWithRegions, null, 2)); // Debug
        res.json(countriesWithRegions);
    }
    catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getCountries = getCountries;
const getCountryById = async (req, res) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const country = await prisma_1.prisma.country.findUnique({
            where: { id },
        });
        if (!country) {
            res.status(404).json({ error: 'Country not found' });
            return;
        }
        // Manually fetch region if exists
        let region = null;
        if (country.regionId) {
            region = await prisma_1.prisma.region.findUnique({
                where: { id: country.regionId }
            });
        }
        res.json({ ...country, region });
    }
    catch (error) {
        console.error('Error fetching country:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getCountryById = getCountryById;
const createCountry = async (req, res) => {
    try {
        const { name, code, regionId } = req.body;
        if (!name || !code) {
            res.status(400).json({
                error: 'Missing required fields: name and code',
            });
            return;
        }
        const country = await prisma_1.prisma.country.create({
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
    }
    catch (error) {
        console.error('Error creating country:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createCountry = createCountry;
const updateCountry = async (req, res) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const { name, code, regionId } = req.body;
        const country = await prisma_1.prisma.country.update({
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
            region = await prisma_1.prisma.region.findUnique({
                where: { id: country.regionId }
            });
        }
        res.json({ ...country, region });
    }
    catch (error) {
        console.error('Error updating country:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateCountry = updateCountry;
const deleteCountry = async (req, res) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        await prisma_1.prisma.country.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting country:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteCountry = deleteCountry;
//# sourceMappingURL=countryController.js.map