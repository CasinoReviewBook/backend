"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFaq = exports.updateFaq = exports.createFaq = exports.getFaqById = exports.getFaqs = void 0;
const prisma_1 = require("../prisma");
const getFaqs = async (req, res) => {
    try {
        const faqs = await prisma_1.prisma.faq.findMany({
            orderBy: [{ category: 'asc' }, { sort_order: 'asc' }],
        });
        res.json(faqs);
    }
    catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getFaqs = getFaqs;
const getFaqById = async (req, res) => {
    try {
        const id = String(req.params.id);
        const faq = await prisma_1.prisma.faq.findUnique({
            where: { id },
        });
        if (!faq) {
            res.status(404).json({ error: 'FAQ not found' });
            return;
        }
        res.json(faq);
    }
    catch (error) {
        console.error('Error fetching FAQ:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getFaqById = getFaqById;
const createFaq = async (req, res) => {
    try {
        const { question, answer, category, sort_order, status } = req.body;
        if (!question || !answer) {
            res.status(400).json({ error: 'Missing required fields: question, answer' });
            return;
        }
        const faq = await prisma_1.prisma.faq.create({
            data: {
                question,
                answer,
                category,
                sort_order: Number(sort_order) || 0,
                status: status !== undefined ? status : true,
            },
        });
        res.status(201).json(faq);
    }
    catch (error) {
        console.error('Error creating FAQ:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createFaq = createFaq;
const updateFaq = async (req, res) => {
    try {
        const id = String(req.params.id);
        const { question, answer, category, sort_order, status } = req.body;
        const faq = await prisma_1.prisma.faq.update({
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
    }
    catch (error) {
        console.error('Error updating FAQ:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateFaq = updateFaq;
const deleteFaq = async (req, res) => {
    try {
        const id = String(req.params.id);
        await prisma_1.prisma.faq.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting FAQ:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteFaq = deleteFaq;
//# sourceMappingURL=faqController.js.map