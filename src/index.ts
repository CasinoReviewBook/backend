import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './prisma';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://casinoreviewsbook.com',
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

import emailRoutes from './routes/emailRoutes';
import casinoRoutes from './routes/casinoRoutes';
import userRoutes from './routes/userRoutes';
import blogRoutes from './routes/blogRoutes';
import newsRoutes from './routes/newsRoutes';
import reviewRoutes from './routes/reviewRoutes';
import faqRoutes from './routes/faqRoutes';
import bannerRoutes from './routes/bannerRoutes';
import affiliateLinkRoutes from './routes/affiliateLinkRoutes';
import mediaRoutes from './routes/mediaRoutes';
import settingsRoutes from './routes/settingsRoutes';
import logsRoutes from './routes/logsRoutes';
import categoryRoutes from './routes/categoryRoutes';
import tagRoutes from './routes/tagRoutes';
import countryRoutes from './routes/countryRoutes';
import gameTypeRoutes from './routes/gameTypeRoutes';
import bannedCountryRoutes from './routes/bannedCountryRoutes';
import regionRoutes from './routes/regionRoutes';

app.use('/api/admin/email-campaigns', emailRoutes);
app.use('/api/admin/casinos', casinoRoutes);
app.use('/api/admin/users', userRoutes);
app.use('/api/admin/blogs', blogRoutes);
app.use('/api/admin/news', newsRoutes);
app.use('/api/admin/reviews', reviewRoutes);
app.use('/api/admin/faqs', faqRoutes);
app.use('/api/admin/banners', bannerRoutes);
app.use('/api/admin/affiliate-links', affiliateLinkRoutes);
app.use('/api/admin/media', mediaRoutes);
app.use('/api/admin/settings', settingsRoutes);
app.use('/api/admin/logs', logsRoutes);
app.use('/api/admin/categories', categoryRoutes);
app.use('/api/admin/tags', tagRoutes);
app.use('/api/admin/countries', countryRoutes);
app.use('/api/admin/game-types', gameTypeRoutes);
app.use('/api/admin/banned-countries', bannedCountryRoutes);
app.use('/api/admin/regions', regionRoutes);

// Public endpoint: get all banned country codes
app.get('/api/banned-countries', async (req, res) => {
  try {
    const countries = await prisma.bannedCountry.findMany({
      select: { country_code: true }
    });
    res.json(countries.map(c => c.country_code));
  } catch (err) {
    console.error("Error fetching banned countries:", err);
    res.status(500).json({ error: 'Failed to fetch banned countries' });
  }
});

// Public API endpoint for frontend
app.get('/api/casinos', async (req, res) => {
  try {
    const casinos = await prisma.casino.findMany({
      where: { status: 'active' },
      orderBy: { ranking_order: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        logo: true,
        featured_image: true,
        rating: true,
        short_description: true,
        featured: true,
        website_url: true,
        affiliate_url: true,
        license_authority: true,
        established_year: true,
        minimum_deposit: true,
        withdrawal_time: true,
        crypto_supported: true,
        mobile_friendly: true,
        live_casino: true,
        sports_betting: true,
        ranking_order: true,
        bonuses: {
          where: { type: 'Welcome Bonus' },
          take: 1,
          orderBy: { sort_order: 'asc' }
        }
      }
    });
    res.json(casinos);
  } catch (err) {
    console.error("Error fetching casinos:", err);
    res.status(500).json({ error: 'Failed to fetch casinos' });
  }
});

// Public API endpoint for news
app.get('/api/news', async (req, res) => {
  try {
    const news = await prisma.news.findMany({
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
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Public API endpoint for blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
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
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Public API endpoint for FAQs
app.get('/api/faqs', async (req, res) => {
  try {
    const faqs = await prisma.faq.findMany({
      where: { status: true },
      orderBy: { sort_order: 'asc' },
      take: 20
    });
    res.json(faqs);
  } catch (err) {
    console.error("Error fetching FAQs:", err);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

app.listen(port, () => {
  console.log(`Backend API listening on port ${port}`);
});
