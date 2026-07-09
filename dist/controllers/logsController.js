"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLog = exports.getLogs = void 0;
const prisma_1 = require("../prisma");
const getLogs = async (req, res) => {
    try {
        const logs = await prisma_1.prisma.activityLog.findMany({
            include: {
                admin: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' },
            take: 100,
        });
        res.json(logs);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getLogs = getLogs;
const deleteLog = async (req, res) => {
    try {
        const id = String(req.params.id);
        await prisma_1.prisma.activityLog.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteLog = deleteLog;
//# sourceMappingURL=logsController.js.map