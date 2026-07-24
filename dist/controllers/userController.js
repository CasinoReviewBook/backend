"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const prisma_1 = require("../prisma");
const mapUserData = (body) => {
    return {
        name: body.name || null,
        email: body.email,
        role: body.role || 'user',
        avatar: body.avatar || null,
        status: body.status || 'active',
        email_verified: typeof body.email_verified === 'boolean' ? body.email_verified : body.email_verified === 'true',
        phone: body.phone || null,
        country: body.country || null,
    };
};
const getUsers = async (req, res) => {
    try {
        const users = await prisma_1.prisma.user.findMany({
            orderBy: { created_at: 'desc' }
        });
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    try {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: String(req.params.id) }
        });
        if (user)
            res.json(user);
        else
            res.status(404).json({ error: 'User not found' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};
exports.getUser = getUser;
const createUser = async (req, res) => {
    try {
        const data = mapUserData(req.body);
        const newUser = await prisma_1.prisma.user.create({
            data
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    try {
        const data = mapUserData(req.body);
        const updatedUser = await prisma_1.prisma.user.update({
            where: { id: String(req.params.id) },
            data
        });
        res.json(updatedUser);
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        await prisma_1.prisma.user.delete({
            where: { id: String(req.params.id) }
        });
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
exports.deleteUser = deleteUser;
// Public registration endpoint — no admin auth required
const registerUser = async (req, res) => {
    try {
        const { name, email, phone, country } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }
        // Check if email already exists
        const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (existing) {
            // Return existing user so frontend can restore session
            return res.json(existing);
        }
        const newUser = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                phone: phone || null,
                country: country || null,
                role: 'user',
                status: 'active',
                email_verified: false,
            }
        });
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ error: 'Failed to register user' });
    }
};
exports.registerUser = registerUser;
//# sourceMappingURL=userController.js.map