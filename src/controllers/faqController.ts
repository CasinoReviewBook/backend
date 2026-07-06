import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getFaqs = async (req: Request, res: Response): Promise<void> => {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: [{ category: 'asc' }, { sort_order: 'asc' }],
    });
    res.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFaqById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const faq = await prisma.faq.findUnique({
      where: { id },
    });
    if (!faq) {
      res.status(404).json({ error: 'FAQ not found' });
      return;
    }
    res.json(faq);
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createFaq = async (req: Request, res: Response): Promise<void> => {
  try {
    const { question, answer, category, sort_order, status } = req.body;

    if (!question || !answer) {
      res.status(400).json({ error: 'Missing required fields: question, answer' });
      return;
    }

    const faq = await prisma.faq.create({
      data: {
        question,
        answer,
        category,
        sort_order: Number(sort_order) || 0,
        status: status !== undefined ? status : true,
      },
    });
    res.status(201).json(faq);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateFaq = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { question, answer, category, sort_order, status } = req.body;

    const faq = await prisma.faq.update({
      where: { id },
      data: {
        question,
        answer,
        category,
        sort_order: sort_order !== undefined ? Number(sort_order) : undefined,
        status,
      },
    });
    res.json(faq);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteFaq = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.faq.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
