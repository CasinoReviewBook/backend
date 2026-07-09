"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBannedCountry = exports.updateBannedCountry = exports.createBannedCountry = exports.getBannedCountryById = exports.getBannedCountries = void 0;
const prisma_1 = require("../prisma");
const getBannedCountries = async (req, res) => {
    try {
        const countries = await prisma_1.prisma.bannedCountry.findMany({
            orderBy: { country_name: 'asc' },
        });
        res.json(countries);
    }
    catch (error) {
        console.error('Error fetching banned countries:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getBannedCountries = getBannedCountries;
const getBannedCountryById = async (req, res) => {
    try {
        const id = String(req.params.id);
        const country = await prisma_1.prisma.bannedCountry.findUnique({ where: { id } });
        if (!country) {
            res.status(404).json({ error: 'Banned country not found' });
            return;
        }
        res.json(country);
    }
    catch (error) {
        console.error('Error fetching banned country:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getBannedCountryById = getBannedCountryById;
const createBannedCountry = async (req, res) => {
    try {
        const { country_code, country_name } = req.body;
        if (!country_code || !country_name) {
            res.status(400).json({ error: 'Missing required fields: country_code, country_name' });
            return;
        }
        const country = await prisma_1.prisma.bannedCountry.create({
            data: { country_code: country_code.toUpperCase(), country_name },
        });
        res.status(201).json(country);
    }
    catch (error) {
        console.error('Error creating banned country:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createBannedCountry = createBannedCountry;
const updateBannedCountry = async (req, res) => {
    try {
        const id = String(req.params.id);
        const { country_code, country_name } = req.body;
        const country = await prisma_1.prisma.bannedCountry.update({
            where: { id },
            data: { country_code: country_code?.toUpperCase(), country_name },
        });
        res.json(country);
    }
    catch (error) {
        console.error('Error updating banned country:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateBannedCountry = updateBannedCountry;
const deleteBannedCountry = async (req, res) => {
    try {
        const id = String(req.params.id);
        await prisma_1.prisma.bannedCountry.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting banned country:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteBannedCountry = deleteBannedCountry;
//# sourceMappingURL=bannedCountryController.js.map