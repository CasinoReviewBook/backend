import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getGameTypes = async (req: Request, res: Response) => {
  try {
    const gameTypes = await prisma.gameType.findMany({
      orderBy: { created_at: 'desc' }
    });
    res.json(gameTypes);
  } catch (error) {
    console.error("Error fetching game types:", error);
    res.status(500).json({ error: 'Failed to fetch game types' });
  }
};

export const getGameType = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const gameType = await prisma.gameType.findUnique({
      where: { id }
    });
    if (gameType) res.json(gameType);
    else res.status(404).json({ error: 'Game type not found' });
  } catch (error) {
    console.error("Error fetching game type:", error);
    res.status(500).json({ error: 'Failed to fetch game type' });
  }
};

export const createGameType = async (req: Request, res: Response) => {
  try {
    const { name, slug } = req.body;
    const newGameType = await prisma.gameType.create({
      data: { name, slug }
    });
    res.status(201).json(newGameType);
  } catch (error) {
    console.error("Error creating game type:", error);
    res.status(500).json({ error: 'Failed to create game type' });
  }
};

export const updateGameType = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { name, slug } = req.body;
    const updatedGameType = await prisma.gameType.update({
      where: { id },
      data: { name, slug }
    });
    res.json(updatedGameType);
  } catch (error) {
    console.error("Error updating game type:", error);
    res.status(500).json({ error: 'Failed to update game type' });
  }
};

export const deleteGameType = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    await prisma.gameType.delete({
      where: { id }
    });
    res.json({ message: 'Game type deleted successfully' });
  } catch (error) {
    console.error("Error deleting game type:", error);
    res.status(500).json({ error: 'Failed to delete game type' });
  }
};
