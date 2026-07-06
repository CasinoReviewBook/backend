"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGameType = exports.updateGameType = exports.createGameType = exports.getGameType = exports.getGameTypes = void 0;
const prisma_1 = require("../prisma");
const getGameTypes = async (req, res) => {
    try {
        const gameTypes = await prisma_1.prisma.gameType.findMany({
            orderBy: { created_at: 'desc' }
        });
        res.json(gameTypes);
    }
    catch (error) {
        console.error("Error fetching game types:", error);
        res.status(500).json({ error: 'Failed to fetch game types' });
    }
};
exports.getGameTypes = getGameTypes;
const getGameType = async (req, res) => {
    try {
        const id = String(req.params.id);
        const gameType = await prisma_1.prisma.gameType.findUnique({
            where: { id }
        });
        if (gameType)
            res.json(gameType);
        else
            res.status(404).json({ error: 'Game type not found' });
    }
    catch (error) {
        console.error("Error fetching game type:", error);
        res.status(500).json({ error: 'Failed to fetch game type' });
    }
};
exports.getGameType = getGameType;
const createGameType = async (req, res) => {
    try {
        const { name, slug } = req.body;
        const newGameType = await prisma_1.prisma.gameType.create({
            data: { name, slug }
        });
        res.status(201).json(newGameType);
    }
    catch (error) {
        console.error("Error creating game type:", error);
        res.status(500).json({ error: 'Failed to create game type' });
    }
};
exports.createGameType = createGameType;
const updateGameType = async (req, res) => {
    try {
        const id = String(req.params.id);
        const { name, slug } = req.body;
        const updatedGameType = await prisma_1.prisma.gameType.update({
            where: { id },
            data: { name, slug }
        });
        res.json(updatedGameType);
    }
    catch (error) {
        console.error("Error updating game type:", error);
        res.status(500).json({ error: 'Failed to update game type' });
    }
};
exports.updateGameType = updateGameType;
const deleteGameType = async (req, res) => {
    try {
        const id = String(req.params.id);
        await prisma_1.prisma.gameType.delete({
            where: { id }
        });
        res.json({ message: 'Game type deleted successfully' });
    }
    catch (error) {
        console.error("Error deleting game type:", error);
        res.status(500).json({ error: 'Failed to delete game type' });
    }
};
exports.deleteGameType = deleteGameType;
//# sourceMappingURL=gameTypeController.js.map