"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCampaign = exports.updateCampaign = exports.getCampaignById = exports.getCampaigns = exports.createAndSendCampaign = void 0;
const prisma_1 = __importDefault(require("../services/prisma"));
const emailService_1 = require("../services/emailService");
const createAndSendCampaign = async (req, res) => {
    try {
        const { subject, body, target } = req.body;
        if (!subject || !body || !target) {
            res.status(400).json({ error: 'Missing required fields: subject, body, target' });
            return;
        }
        // Create the campaign in DB
        const campaign = await prisma_1.default.emailCampaign.create({
            data: {
                subject,
                body,
                target,
                status: 'scheduling',
            },
        });
        // Schedule the campaign (add to BullMQ)
        await (0, emailService_1.scheduleCampaign)(campaign.id, subject, body, target);
        res.status(201).json({ message: 'Campaign created and scheduled successfully', campaign });
    }
    catch (error) {
        console.error('Error in createAndSendCampaign:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createAndSendCampaign = createAndSendCampaign;
const getCampaigns = async (req, res) => {
    try {
        const campaigns = await prisma_1.default.emailCampaign.findMany({
            orderBy: { created_at: 'desc' },
        });
        res.json(campaigns);
    }
    catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getCampaigns = getCampaigns;
const getCampaignById = async (req, res) => {
    try {
        const id = String(req.params.id);
        const campaign = await prisma_1.default.emailCampaign.findUnique({
            where: { id },
        });
        if (!campaign) {
            res.status(404).json({ error: 'Campaign not found' });
            return;
        }
        res.json(campaign);
    }
    catch (error) {
        console.error('Error fetching campaign:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getCampaignById = getCampaignById;
const updateCampaign = async (req, res) => {
    try {
        const id = String(req.params.id);
        const { subject, body, target, status } = req.body;
        const campaign = await prisma_1.default.emailCampaign.update({
            where: { id },
            data: { subject, body, target, status },
        });
        res.json(campaign);
    }
    catch (error) {
        console.error('Error updating campaign:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateCampaign = updateCampaign;
const deleteCampaign = async (req, res) => {
    try {
        const id = String(req.params.id);
        await prisma_1.default.emailCampaign.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting campaign:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteCampaign = deleteCampaign;
//# sourceMappingURL=emailController.js.map