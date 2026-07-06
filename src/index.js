"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = require("./prisma");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
}));
app.use(express_1.default.json());
// Serve static files from uploads directory
app.use('/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'uploads')));
const emailRoutes_1 = __importDefault(require("./routes/emailRoutes"));
const casinoRoutes_1 = __importDefault(require("./routes/casinoRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const newsRoutes_1 = __importDefault(require("./routes/newsRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const faqRoutes_1 = __importDefault(require("./routes/faqRoutes"));
const bannerRoutes_1 = __importDefault(require("./routes/bannerRoutes"));
const affiliateLinkRoutes_1 = __importDefault(require("./routes/affiliateLinkRoutes"));
const mediaRoutes_1 = __importDefault(require("./routes/mediaRoutes"));
const settingsRoutes_1 = __importDefault(require("./routes/settingsRoutes"));
const logsRoutes_1 = __importDefault(require("./routes/logsRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const tagRoutes_1 = __importDefault(require("./routes/tagRoutes"));
const countryRoutes_1 = __importDefault(require("./routes/countryRoutes"));
const gameTypeRoutes_1 = __importDefault(require("./routes/gameTypeRoutes"));
const bannedCountryRoutes_1 = __importDefault(require("./routes/bannedCountryRoutes"));
const regionRoutes_1 = __importDefault(require("./routes/regionRoutes"));
app.use('/api/admin/email-campaigns', emailRoutes_1.default);
app.use('/api/admin/casinos', casinoRoutes_1.default);
app.use('/api/admin/users', userRoutes_1.default);
app.use('/api/admin/blogs', blogRoutes_1.default);
app.use('/api/admin/news', newsRoutes_1.default);
app.use('/api/admin/reviews', reviewRoutes_1.default);
app.use('/api/admin/faqs', faqRoutes_1.default);
app.use('/api/admin/banners', bannerRoutes_1.default);
app.use('/api/admin/affiliate-links', affiliateLinkRoutes_1.default);
app.use('/api/admin/media', mediaRoutes_1.default);
app.use('/api/admin/settings', settingsRoutes_1.default);
app.use('/api/admin/logs', logsRoutes_1.default);
app.use('/api/admin/categories', categoryRoutes_1.default);
app.use('/api/admin/tags', tagRoutes_1.default);
app.use('/api/admin/countries', countryRoutes_1.default);
app.use('/api/admin/game-types', gameTypeRoutes_1.default);
app.use('/api/admin/banned-countries', bannedCountryRoutes_1.default);
app.use('/api/admin/regions', regionRoutes_1.default);
// Public endpoint: get all banned country codes
app.get('/api/banned-countries', async (req, res) => {
    try {
        const countries = await prisma_1.prisma.bannedCountry.findMany({
            select: { country_code: true }
        });
        res.json(countries.map(c => c.country_code));
    }
    catch (err) {
        console.error("Error fetching banned countries:", err);
        res.status(500).json({ error: 'Failed to fetch banned countries' });
    }
});
// Public API endpoint for frontend
app.get('/api/casinos', async (req, res) => {
    try {
        const casinos = await prisma_1.prisma.casino.findMany({
            where: { status: 'active' },
            orderBy: { rating: 'desc' },
            take: 3,
            select: {
                id: true,
                name: true,
                slug: true,
                logo: true,
                rating: true,
                short_description: true,
                featured: true,
                bonuses: {
                    where: { type: 'Welcome Bonus' },
                    take: 1,
                    orderBy: { sort_order: 'asc' }
                }
            }
        });
        res.json(casinos);
    }
    catch (err) {
        console.error("Error fetching casinos:", err);
        res.status(500).json({ error: 'Failed to fetch casinos' });
    }
});
// Public API endpoint for news
app.get('/api/news', async (req, res) => {
    try {
        const news = await prisma_1.prisma.news.findMany({
            where: { status: 'published' },
            orderBy: { published_at: 'desc' },
            take: 10,
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        res.json(news);
    }
    catch (err) {
        console.error("Error fetching news:", err);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});
// Public API endpoint for blogs
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await prisma_1.prisma.blog.findMany({
            where: { status: 'published' },
            orderBy: { published_at: 'desc' },
            take: 10,
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        res.json(blogs);
    }
    catch (err) {
        console.error("Error fetching blogs:", err);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});
// Public API endpoint for FAQs
app.get('/api/faqs', async (req, res) => {
    try {
        const faqs = await prisma_1.prisma.faq.findMany({
            where: { status: true },
            orderBy: { sort_order: 'asc' },
            take: 20
        });
        res.json(faqs);
    }
    catch (err) {
        console.error("Error fetching FAQs:", err);
        res.status(500).json({ error: 'Failed to fetch FAQs' });
    }
});
app.listen(port, () => {
    console.log(`Backend API listening on port ${port}`);
});
//# sourceMappingURL=index.js.map