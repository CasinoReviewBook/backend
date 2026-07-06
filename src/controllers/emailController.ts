import { Request, Response } from 'express';
import prisma from '../services/prisma';
import { scheduleCampaign } from '../services/emailService';

export const createAndSendCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const { subject, body, target } = req.body;

    if (!subject || !body || !target) {
      res.status(400).json({ error: 'Missing required fields: subject, body, target' });
      return;
    }

    // Create the campaign in DB
    const campaign = await prisma.emailCampaign.create({
      data: {
        subject,
        body,
        target,
        status: 'scheduling',
      },
    });

    // Schedule the campaign (add to BullMQ)
    await scheduleCampaign(campaign.id, subject, body, target);

    res.status(201).json({ message: 'Campaign created and scheduled successfully', campaign });
  } catch (error) {
    console.error('Error in createAndSendCampaign:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCampaigns = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaigns = await prisma.emailCampaign.findMany({
      orderBy: { created_at: 'desc' },
    });
    res.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCampaignById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const campaign = await prisma.emailCampaign.findUnique({
      where: { id },
    });
    if (!campaign) {
      res.status(404).json({ error: 'Campaign not found' });
      return;
    }
    res.json(campaign);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { subject, body, target, status } = req.body;
    const campaign = await prisma.emailCampaign.update({
      where: { id },
      data: { subject, body, target, status },
    });
    res.json(campaign);
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.emailCampaign.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
