import { Request, Response } from 'express';
import { prisma } from '../prisma';

const mapUserData = (body: any) => {
  return {
    name: body.name || null,
    email: body.email,
    role: body.role || 'user',
    avatar: body.avatar || null,
    status: body.status || 'active',
    email_verified: typeof body.email_verified === 'boolean' ? body.email_verified : body.email_verified === 'true',
  };
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { created_at: 'desc' }
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: String(req.params.id) }
    });
    if (user) res.json(user);
    else res.status(404).json({ error: 'User not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = mapUserData(req.body);
    const newUser = await prisma.user.create({
      data
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const data = mapUserData(req.body);
    const updatedUser = await prisma.user.update({
      where: { id: String(req.params.id) },
      data
    });
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({
      where: { id: String(req.params.id) }
    });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
