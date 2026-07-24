import { Request, Response } from 'express';
import { prisma } from '../prisma';

// Public endpoint to submit contact ticket
export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, department, casinoName, subject, message } = req.body;

    if (!name || !email || !department || !subject || !message) {
      res.status(400).json({ error: 'Missing required fields: name, email, department, subject, message' });
      return;
    }

    // Try to find a registered user with this email
    const registeredUser = await prisma.user.findUnique({
      where: { email },
    });

    const ticket = await prisma.contactTicket.create({
      data: {
        name,
        email,
        department,
        casino_name: casinoName || null,
        subject,
        message,
        status: 'pending',
        user_id: registeredUser ? registeredUser.id : null,
      },
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating contact ticket:', error);
    res.status(500).json({ error: 'Failed to submit contact ticket' });
  }
};

// Public endpoint to query my tickets by email
export const getUserTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.query.email as string;

    if (!email) {
      res.status(400).json({ error: 'Email parameter is required' });
      return;
    }

    const tickets = await prisma.contactTicket.findMany({
      where: { email },
      orderBy: { created_at: 'desc' },
    });

    res.json(tickets);
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

// Admin endpoint: List all tickets
export const getTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const tickets = await prisma.contactTicket.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
    res.json(tickets);
  } catch (error) {
    console.error('Error listing contact tickets:', error);
    res.status(500).json({ error: 'Failed to list contact tickets' });
  }
};

// Admin endpoint: Get single ticket details
export const getTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const ticket = await prisma.contactTicket.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    res.json(ticket);
  } catch (error) {
    console.error('Error fetching ticket details:', error);
    res.status(500).json({ error: 'Failed to fetch ticket details' });
  }
};

// Admin endpoint: Update status
export const updateTicketStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { status } = req.body;

    if (!status) {
      res.status(400).json({ error: 'Status is required' });
      return;
    }

    const updatedTicket = await prisma.contactTicket.update({
      where: { id },
      data: { status },
    });

    res.json(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({ error: 'Failed to update ticket status' });
  }
};

// Admin endpoint: Delete a ticket
export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.contactTicket.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
};
