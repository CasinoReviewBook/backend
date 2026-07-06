import { Request, Response } from 'express';
import { prisma } from '../prisma';
import * as XLSX from 'xlsx';

const splitByCommaOrNewline = (val: any): string[] => {
  if (Array.isArray(val)) return val;
  if (!val || typeof val !== 'string') return [];
  if (val.includes('\n')) {
    return val.split('\n').map((s: string) => s.trim()).filter(Boolean);
  }
  return val.split(',').map((s: string) => s.trim()).filter(Boolean);
};

export const getCasinos = async (req: Request, res: Response) => {
  try {
    const casinos = await prisma.casino.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        badges: {
          include: {
            badge: true
          }
        }
      }
    });
    res.json(casinos);
  } catch (error) {
    console.error("Error fetching casinos:", error);
    res.status(500).json({ error: 'Failed to fetch casinos' });
  }
};

export const getCasino = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const casino = await prisma.casino.findUnique({
      where: { id },
      include: {
        languages: true,
        bonuses: true,
        features: true,
        pros: true,
        cons: true,
        payment_methods: true,
        currencies: true,
        game_providers: true,
        tags: {
          include: {
            tag: true
          }
        },
        categories: {
          include: {
            category: true
          }
        },
        game_types: {
          include: {
            game_type: true
          }
        },
        available_countries: {
          include: {
            country: true
          }
        },
        restricted_countries: {
          include: {
            country: true
          }
        },
        screenshots: true,
        gallery_videos: true,
        faqs: true,
        badges: {
          include: {
            badge: true
          }
        },
        reviews_summary: true
      }
    });
    if (casino) res.json(casino);
    else res.status(404).json({ error: 'Casino not found' });
  } catch (error) {
    console.error("Error fetching casino:", error);
    res.status(500).json({ error: 'Failed to fetch casino' });
  }
};

export const createCasino = async (req: Request, res: Response) => {
  try {
    const {
  languages,
  bonuses,
  features,
  pros,
  cons,
  payment_methods,
  currencies,
  game_providers,
  tags,
  categories,
  game_types,
  available_countries,
  restricted_countries,
  screenshots,
  gallery_videos,
  faqs,
  badges,
  reviews_summary,
  ...casinoData
} = req.body;

    // Check if slug already exists
    if (casinoData.slug) {
      const existingCasino = await prisma.casino.findUnique({
        where: { slug: casinoData.slug }
      });
      if (existingCasino) {
        res.status(400).json({ error: 'A casino with this slug already exists. Please use a different slug.' });
        return;
      }
    }

    const newCasino = await prisma.casino.create({
      data: {
        ...casinoData,
        rating: casinoData.rating ? parseFloat(casinoData.rating) : null,
        minimum_deposit: casinoData.minimum_deposit ? parseFloat(casinoData.minimum_deposit) : null,
        visits: casinoData.visits ? parseInt(casinoData.visits, 10) : 0,
        established_year: casinoData.established_year ? parseInt(casinoData.established_year, 10) : null,
        featured: casinoData.featured === true || casinoData.featured === 'true',
        hot_casino: casinoData.hot_casino === true || casinoData.hot_casino === 'true',
        recommended_by_experts: casinoData.recommended_by_experts === true || casinoData.recommended_by_experts === 'true',
        certified_casino: casinoData.certified_casino === true || casinoData.certified_casino === 'true',
        mobile_friendly: casinoData.mobile_friendly === true || casinoData.mobile_friendly === 'true',
        crypto_supported: casinoData.crypto_supported === true || casinoData.crypto_supported === 'true',
        live_casino: casinoData.live_casino === true || casinoData.live_casino === 'true',
        sports_betting: casinoData.sports_betting === true || casinoData.sports_betting === 'true',
        responsible_gaming: casinoData.responsible_gaming === true || casinoData.responsible_gaming === 'true',
        support_methods: splitByCommaOrNewline(casinoData.support_methods),
        meta_keywords: splitByCommaOrNewline(casinoData.meta_keywords),
        
        languages: languages ? {
          create: splitByCommaOrNewline(languages).map((lang: string) => ({ language: lang }))
        } : undefined,
        bonuses: bonuses ? {
          create: bonuses.map((bonus: any) => ({
            title: bonus.title,
            type: bonus.type,
            amount: bonus.amount,
            bonus_code: bonus.bonus_code || null,
            wagering_requirement: bonus.wagering_requirement || null,
            sort_order: bonus.sort_order ? parseInt(bonus.sort_order, 10) : 0
          }))
        } : undefined,
        features: features ? {
          create: splitByCommaOrNewline(features).map((feat: string) => ({ feature: feat }))
        } : undefined,
        pros: pros ? {
          create: splitByCommaOrNewline(pros).map((pro: string) => ({ content: pro }))
        } : undefined,
        cons: cons ? {
          create: splitByCommaOrNewline(cons).map((con: string) => ({ content: con }))
        } : undefined,
        payment_methods: payment_methods ? {
          create: splitByCommaOrNewline(payment_methods).map((method: string) => ({ method_name: method }))
        } : undefined,
        currencies: currencies ? {
          create: splitByCommaOrNewline(currencies).map((curr: string) => ({ currency_code: curr }))
        } : undefined,
        game_providers: game_providers ? {
          create: splitByCommaOrNewline(game_providers).map((prov: string) => ({ provider_name: prov }))
        } : undefined,
        tags: tags ? {
          create: tags.map((tagId: string) => ({ tag_id: tagId }))
        } : undefined,
        categories: categories ? {
          create: categories.map((catId: string) => ({ category_id: catId }))
        } : undefined,
        game_types: game_types ? {
          create: game_types.map((gtId: string) => ({ game_type_id: gtId }))
        } : undefined,
        available_countries: available_countries ? {
          create: available_countries.map((countryId: string) => ({ country_id: countryId }))
        } : undefined,
        restricted_countries: restricted_countries ? {
          create: restricted_countries.map((countryId: string) => ({ country_id: countryId }))
        } : undefined,
        screenshots: screenshots ? {
          create: screenshots.map((screen: any) => ({
            image_url: screen.image_url,
            sort_order: screen.sort_order ? parseInt(screen.sort_order, 10) : 0
          }))
        } : undefined,
        gallery_videos: gallery_videos ? {
          create: gallery_videos.map((vid: any) => ({
            video_url: vid.video_url,
            title: vid.title || null,
            sort_order: vid.sort_order ? parseInt(vid.sort_order, 10) : 0
          }))
        } : undefined,
        faqs: faqs ? {
          create: faqs.map((faq: any) => ({
            question: faq.question,
            answer: faq.answer,
            sort_order: faq.sort_order ? parseInt(faq.sort_order, 10) : 0
          }))
        } : undefined,
        badges: badges ? {
          create: badges.map((badgeId: string) => ({ badge_id: badgeId }))
        } : undefined,
        reviews_summary: reviews_summary ? {
          create: {
            average_rating: reviews_summary.average_rating ? parseFloat(reviews_summary.average_rating) : null,
            total_reviews: reviews_summary.total_reviews ? parseInt(reviews_summary.total_reviews, 10) : 0,
            total_clicks: reviews_summary.total_clicks ? parseInt(reviews_summary.total_clicks, 10) : 0,
            total_views: reviews_summary.total_views ? parseInt(reviews_summary.total_views, 10) : 0
          }
        } : undefined
      }
    });
    res.status(201).json(newCasino);
  } catch (error) {
    console.error("Error creating casino:", error);
    res.status(500).json({ error: 'Failed to create casino' });
  }
};

export const updateCasino = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const {
      languages, bonuses, features, pros, cons, payment_methods, currencies,
      game_providers, tags, categories, game_types, available_countries, restricted_countries,
      screenshots, gallery_videos, faqs, badges, reviews_summary, ...casinoData
    } = req.body;

    const updatedCasino = await prisma.$transaction(async (tx) => {
      // Clear out existing relation entries
      if (languages !== undefined) await tx.casinoLanguage.deleteMany({ where: { casino_id: id } });
      if (bonuses !== undefined) await tx.casinoBonus.deleteMany({ where: { casino_id: id } });
      if (features !== undefined) await tx.casinoFeature.deleteMany({ where: { casino_id: id } });
      if (pros !== undefined) await tx.casinoPros.deleteMany({ where: { casino_id: id } });
      if (cons !== undefined) await tx.casinoCons.deleteMany({ where: { casino_id: id } });
      if (payment_methods !== undefined) await tx.casinoPaymentMethod.deleteMany({ where: { casino_id: id } });
      if (currencies !== undefined) await tx.casinoCurrency.deleteMany({ where: { casino_id: id } });
      if (game_providers !== undefined) await tx.casinoGameProvider.deleteMany({ where: { casino_id: id } });
      if (tags !== undefined) await tx.casinoTagMapping.deleteMany({ where: { casino_id: id } });
      if (categories !== undefined) await tx.casinoCategoryMapping.deleteMany({ where: { casino_id: id } });
      if (game_types !== undefined) await tx.casinoGameTypeMapping.deleteMany({ where: { casino_id: id } });
      if (available_countries !== undefined) await tx.casinoAvailableCountry.deleteMany({ where: { casino_id: id } });
      if (restricted_countries !== undefined) await tx.casinoRestrictedCountry.deleteMany({ where: { casino_id: id } });
      if (screenshots !== undefined) await tx.casinoScreenshot.deleteMany({ where: { casino_id: id } });
      if (gallery_videos !== undefined) await tx.casinoGalleryVideo.deleteMany({ where: { casino_id: id } });
      if (faqs !== undefined) await tx.casinoFaq.deleteMany({ where: { casino_id: id } });
      if (badges !== undefined) await tx.casinoBadgeMapping.deleteMany({ where: { casino_id: id } });
      if (reviews_summary !== undefined) await tx.casinoReviewsSummary.deleteMany({ where: { casino_id: id } });

      return tx.casino.update({
        where: { id },
        data: {
          ...casinoData,
          rating: casinoData.rating !== undefined ? (casinoData.rating ? parseFloat(casinoData.rating) : null) : undefined,
          minimum_deposit: casinoData.minimum_deposit !== undefined ? (casinoData.minimum_deposit ? parseFloat(casinoData.minimum_deposit) : null) : undefined,
          visits: casinoData.visits !== undefined ? parseInt(casinoData.visits, 10) : undefined,
          established_year: casinoData.established_year !== undefined ? (casinoData.established_year ? parseInt(casinoData.established_year, 10) : null) : undefined,
          featured: casinoData.featured !== undefined ? (casinoData.featured === true || casinoData.featured === 'true') : undefined,
          hot_casino: casinoData.hot_casino !== undefined ? (casinoData.hot_casino === true || casinoData.hot_casino === 'true') : undefined,
          recommended_by_experts: casinoData.recommended_by_experts !== undefined ? (casinoData.recommended_by_experts === true || casinoData.recommended_by_experts === 'true') : undefined,
          certified_casino: casinoData.certified_casino !== undefined ? (casinoData.certified_casino === true || casinoData.certified_casino === 'true') : undefined,
          mobile_friendly: casinoData.mobile_friendly !== undefined ? (casinoData.mobile_friendly === true || casinoData.mobile_friendly === 'true') : undefined,
          crypto_supported: casinoData.crypto_supported !== undefined ? (casinoData.crypto_supported === true || casinoData.crypto_supported === 'true') : undefined,
          live_casino: casinoData.live_casino !== undefined ? (casinoData.live_casino === true || casinoData.live_casino === 'true') : undefined,
          sports_betting: casinoData.sports_betting !== undefined ? (casinoData.sports_betting === true || casinoData.sports_betting === 'true') : undefined,
          responsible_gaming: casinoData.responsible_gaming !== undefined ? (casinoData.responsible_gaming === true || casinoData.responsible_gaming === 'true') : undefined,
          support_methods: casinoData.support_methods !== undefined ? splitByCommaOrNewline(casinoData.support_methods) : undefined,
          meta_keywords: casinoData.meta_keywords !== undefined ? splitByCommaOrNewline(casinoData.meta_keywords) : undefined,

          languages: languages ? {
            create: splitByCommaOrNewline(languages).map((lang: string) => ({ language: lang }))
          } : undefined,
          bonuses: bonuses ? {
            create: bonuses.map((bonus: any) => ({
              title: bonus.title,
              type: bonus.type,
              amount: bonus.amount,
              bonus_code: bonus.bonus_code || null,
              wagering_requirement: bonus.wagering_requirement || null,
              sort_order: bonus.sort_order ? parseInt(bonus.sort_order, 10) : 0
            }))
          } : undefined,
          features: features ? {
            create: splitByCommaOrNewline(features).map((feat: string) => ({ feature: feat }))
          } : undefined,
          pros: pros ? {
            create: splitByCommaOrNewline(pros).map((pro: string) => ({ content: pro }))
          } : undefined,
          cons: cons ? {
            create: splitByCommaOrNewline(cons).map((con: string) => ({ content: con }))
          } : undefined,
          payment_methods: payment_methods ? {
            create: splitByCommaOrNewline(payment_methods).map((method: string) => ({ method_name: method }))
          } : undefined,
          currencies: currencies ? {
            create: splitByCommaOrNewline(currencies).map((curr: string) => ({ currency_code: curr }))
          } : undefined,
          game_providers: game_providers ? {
            create: splitByCommaOrNewline(game_providers).map((prov: string) => ({ provider_name: prov }))
          } : undefined,
          tags: tags ? {
            create: tags.map((tagId: string) => ({ tag_id: tagId }))
          } : undefined,
          categories: categories ? {
            create: categories.map((catId: string) => ({ category_id: catId }))
          } : undefined,
          game_types: game_types ? {
            create: game_types.map((gtId: string) => ({ game_type_id: gtId }))
          } : undefined,
          available_countries: available_countries ? {
            create: available_countries.map((countryId: string) => ({ country_id: countryId }))
          } : undefined,
          restricted_countries: restricted_countries ? {
            create: restricted_countries.map((countryId: string) => ({ country_id: countryId }))
          } : undefined,
          screenshots: screenshots ? {
            create: screenshots.map((screen: any) => ({
              image_url: screen.image_url,
              sort_order: screen.sort_order ? parseInt(screen.sort_order, 10) : 0
            }))
          } : undefined,
          gallery_videos: gallery_videos ? {
            create: gallery_videos.map((vid: any) => ({
              video_url: vid.video_url,
              title: vid.title || null,
              sort_order: vid.sort_order ? parseInt(vid.sort_order, 10) : 0
            }))
          } : undefined,
          faqs: faqs ? {
            create: faqs.map((faq: any) => ({
              question: faq.question,
              answer: faq.answer,
              sort_order: faq.sort_order ? parseInt(faq.sort_order, 10) : 0
            }))
          } : undefined,
          badges: badges ? {
            create: badges.map((badgeId: string) => ({ badge_id: badgeId }))
          } : undefined,
          reviews_summary: reviews_summary ? {
            create: {
              average_rating: reviews_summary.average_rating ? parseFloat(reviews_summary.average_rating) : null,
              total_reviews: reviews_summary.total_reviews ? parseInt(reviews_summary.total_reviews, 10) : 0,
              total_clicks: reviews_summary.total_clicks ? parseInt(reviews_summary.total_clicks, 10) : 0,
              total_views: reviews_summary.total_views ? parseInt(reviews_summary.total_views, 10) : 0
            }
          } : undefined
        }
      });
    });

    res.json(updatedCasino);
  } catch (error) {
    console.error("Error updating casino:", error);
    res.status(500).json({ error: 'Failed to update casino' });
  }
};

export const deleteCasino = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    await prisma.casino.delete({
      where: { id }
    });
    res.json({ message: 'Casino deleted successfully' });
  } catch (error) {
    console.error("Error deleting casino:", error);
    res.status(500).json({ error: 'Failed to delete casino' });
  }
};

export const exportCasinos = async (req: Request, res: Response) => {
  try {
    const casinos = await prisma.casino.findMany({
      orderBy: { ranking_order: 'asc' },
      include: {
        languages: true,
        bonuses: true,
        features: true,
        pros: true,
        cons: true,
        payment_methods: true,
        currencies: true,
        game_providers: true,
        screenshots: true,
        faqs: true,
      }
    });

    const worksheetData = casinos.map(casino => ({
      'ID': casino.id,
      'Name': casino.name || '',
      'Slug': casino.slug || '',
      'Logo URL': casino.logo || '',
      'Featured Image URL': casino.featured_image || '',
      'Website URL': casino.website_url || '',
      'Affiliate URL': casino.affiliate_url || '',
      'Short Description': casino.short_description || '',
      'Overview': casino.overview || '',
      'Rating': casino.rating?.toString() || '',
      'Visits': casino.visits?.toString() || '0',
      'Established Year': casino.established_year?.toString() || '',
      'Company Name': casino.company_name || '',
      'License Authority': casino.license_authority || '',
      'Minimum Deposit': casino.minimum_deposit?.toString() || '',
      'Withdrawal Time': casino.withdrawal_time || '',
      'Status': casino.status || 'active',
      'Featured': casino.featured ? 'Yes' : 'No',
      'Hot Casino': casino.hot_casino ? 'Yes' : 'No',
      'Recommended by Experts': casino.recommended_by_experts ? 'Yes' : 'No',
      'Certified Casino': casino.certified_casino ? 'Yes' : 'No',
      'Mobile Friendly': casino.mobile_friendly ? 'Yes' : 'No',
      'Crypto Supported': casino.crypto_supported ? 'Yes' : 'No',
      'Live Casino': casino.live_casino ? 'Yes' : 'No',
      'Sports Betting': casino.sports_betting ? 'Yes' : 'No',
      'Responsible Gaming': casino.responsible_gaming ? 'Yes' : 'No',
      'Support Methods': Array.isArray(casino.support_methods) ? (casino.support_methods as string[]).join(', ') : '',
      'Meta Keywords': Array.isArray(casino.meta_keywords) ? (casino.meta_keywords as string[]).join(', ') : '',
      'Ranking Order': casino.ranking_order?.toString() || '0',
      'Ranking Position': casino.ranking_position || 'middle',
      'Meta Title': casino.meta_title || '',
      'Meta Description': casino.meta_description || '',
      'Languages': casino.languages.map(l => l.language).join(', '),
      'Bonuses': casino.bonuses.map(b => `${b.title}|${b.type}|${b.amount}${b.bonus_code ? '|code:' + b.bonus_code : ''}${b.wagering_requirement ? '|wagering:' + b.wagering_requirement : ''}`).join('; '),
      'Features': casino.features.map(f => f.feature).join(', '),
      'Pros': casino.pros.map(p => p.content).join(', '),
      'Cons': casino.cons.map(c => c.content).join(', '),
      'Payment Methods': casino.payment_methods.map(p => p.method_name).join(', '),
      'Currencies': casino.currencies.map(c => c.currency_code).join(', '),
      'Game Providers': casino.game_providers.map(g => g.provider_name).join(', '),
      'FAQs': casino.faqs.map(f => `Q: ${f.question} | A: ${f.answer}`).join(' || '),
      'Created At': casino.created_at ? new Date(casino.created_at).toISOString() : '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Casinos');

    const colWidths = Object.keys(worksheetData[0] || {}).map(key => ({ wch: Math.max(key.length, 20) }));
    worksheet['!cols'] = colWidths;

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=casinos_export.xlsx');
    res.send(buffer);
  } catch (error) {
    console.error('Error exporting casinos:', error);
    res.status(500).json({ error: 'Failed to export casinos' });
  }
};

export const exportCasinosTemplate = async (req: Request, res: Response) => {
  try {
    // Create a template with example row
    const templateData = [
      {
        'Name': 'Example Casino Name',
        'Slug': 'example-casino-slug',
        'Logo URL': 'https://example.com/logo.png',
        'Featured Image URL': 'https://example.com/featured.png',
        'Website URL': 'https://example.com',
        'Affiliate URL': 'https://affiliate.example.com',
        'Short Description': 'Short description of the casino',
        'Overview': 'Full description of the casino with details about games, bonuses, and features.',
        'Rating': '4.5',
        'Visits': '1000',
        'Established Year': '2020',
        'Company Name': 'Example Company Ltd',
        'License Authority': 'Malta Gaming Authority',
        'Minimum Deposit': '10',
        'Withdrawal Time': '24 hours',
        'Status': 'active',
        'Featured': 'Yes',
        'Hot Casino': 'No',
        'Recommended by Experts': 'No',
        'Certified Casino': 'No',
        'Mobile Friendly': 'Yes',
        'Crypto Supported': 'Yes',
        'Live Casino': 'Yes',
        'Sports Betting': 'No',
        'Responsible Gaming': 'Yes',
        'Support Methods': 'Live Chat, Email, Phone',
        'Meta Keywords': 'casino, bonus, slots, live dealer',
        'Ranking Order': '0',
        'Ranking Position': 'middle',
        'Meta Title': 'Example Casino - Best Bonuses',
        'Meta Description': 'Detailed description for SEO',
        'Languages': 'English, German, French',
        'Bonuses': 'Welcome Bonus|deposit|100% up to $500|code:WELCOME100|wagering:35x; Free Spins|free_spins|50 Free Spins|code:SPIN50',
        'Features': 'Live Dealer Games, Mobile App, Instant Withdrawals',
        'Pros': 'Great game selection, Fast payouts',
        'Cons': 'High wagering requirements',
        'Payment Methods': 'Visa, Mastercard, PayPal, Skrill, Neteller',
        'Currencies': 'USD, EUR, GBP, BTC',
        'Game Providers': 'NetEnt, Microgaming, Playtech, Evolution Gaming',
        'FAQs': 'Q: What is the minimum deposit? | A: The minimum deposit is $10. || Q: How long do withdrawals take? | A: Withdrawals take 24-48 hours.',
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=casinos_template.xlsx');
    res.send(buffer);
  } catch (error) {
    console.error('Error exporting template:', error);
    res.status(500).json({ error: 'Failed to export template' });
  }
};

const parseSplitField = (val: any): string[] => {
  if (!val || typeof val !== 'string') return [];
  return val.split(/[,\n]/).map((s: string) => s.trim()).filter(Boolean);
};

const parseBonuses = (val: any): { title: string; type: string; amount: string; bonus_code?: string; wagering_requirement?: string }[] => {
  if (!val || typeof val !== 'string') return [];
  return val.split(';').map(entry => {
    const parts = entry.trim().split('|');
    const bonus: any = { title: parts[0]?.trim() || '', type: parts[1]?.trim() || 'deposit', amount: parts[2]?.trim() || '' };
    for (let i = 3; i < parts.length; i++) {
      const p = parts[i].trim();
      if (p.startsWith('code:')) bonus.bonus_code = p.replace('code:', '').trim();
      else if (p.startsWith('wagering:')) bonus.wagering_requirement = p.replace('wagering:', '').trim();
    }
    return bonus;
  }).filter(b => b.title);
};

const parseFaqs = (val: any): { question: string; answer: string }[] => {
  if (!val || typeof val !== 'string') return [];
  return val.split('||').map(entry => {
    const parts = entry.trim().split('| A:');
    return {
      question: parts[0]?.replace('Q:', '').trim() || '',
      answer: parts[1]?.trim() || parts[0]?.trim() || ''
    };
  }).filter(f => f.question);
};

export const importCasinos = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    };

    for (const row of data as any) {
      try {
        const support_methods = parseSplitField(row['Support Methods']);
        const meta_keywords = parseSplitField(row['Meta Keywords']);
        const languages = parseSplitField(row['Languages']);
        const features = parseSplitField(row['Features']);
        const pros = parseSplitField(row['Pros']);
        const cons = parseSplitField(row['Cons']);
        const payment_methods = parseSplitField(row['Payment Methods']);
        const currencies = parseSplitField(row['Currencies']);
        const game_providers = parseSplitField(row['Game Providers']);
        const bonuses = parseBonuses(row['Bonuses']);
        const faqs = parseFaqs(row['FAQs']);

        const slug = row['Slug']?.toString().trim().toLowerCase().replace(/\s+/g, '-') || '';
        const rowId = row['ID']?.toString().trim() || '';

        const casinoData: any = {
          name: row['Name']?.toString().trim() || '',
          slug,
          logo: row['Logo URL']?.toString().trim() || null,
          featured_image: row['Featured Image URL']?.toString().trim() || null,
          website_url: row['Website URL']?.toString().trim() || null,
          affiliate_url: row['Affiliate URL']?.toString().trim() || null,
          short_description: row['Short Description']?.toString().trim() || null,
          overview: row['Overview']?.toString().trim() || null,
          rating: row['Rating'] ? parseFloat(row['Rating'].toString()) : null,
          visits: row['Visits'] ? parseInt(row['Visits'].toString(), 10) : 0,
          established_year: row['Established Year'] ? parseInt(row['Established Year'].toString(), 10) : null,
          company_name: row['Company Name']?.toString().trim() || null,
          license_authority: row['License Authority']?.toString().trim() || null,
          minimum_deposit: row['Minimum Deposit'] ? parseFloat(row['Minimum Deposit'].toString()) : null,
          withdrawal_time: row['Withdrawal Time']?.toString().trim() || null,
          status: row['Status']?.toString().trim() || 'active',
          featured: row['Featured'] === 'Yes',
          hot_casino: row['Hot Casino'] === 'Yes',
          recommended_by_experts: row['Recommended by Experts'] === 'Yes',
          certified_casino: row['Certified Casino'] === 'Yes',
          mobile_friendly: row['Mobile Friendly'] === 'Yes',
          crypto_supported: row['Crypto Supported'] === 'Yes',
          live_casino: row['Live Casino'] === 'Yes',
          sports_betting: row['Sports Betting'] === 'Yes',
          responsible_gaming: row['Responsible Gaming'] === 'Yes',
          support_methods,
          meta_keywords,
          ranking_order: row['Ranking Order'] ? parseInt(row['Ranking Order'].toString(), 10) : 0,
          ranking_position: row['Ranking Position']?.toString().trim() || 'middle',
          meta_title: row['Meta Title']?.toString().trim() || null,
          meta_description: row['Meta Description']?.toString().trim() || null,
        };

        // Try to find existing casino by ID first, then by slug
        let existingId: string | null = null;
        if (rowId) {
          const byId = await prisma.casino.findUnique({ where: { id: rowId } });
          if (byId) existingId = byId.id;
        }
        if (!existingId && slug) {
          const bySlug = await prisma.casino.findUnique({ where: { slug } });
          if (bySlug) existingId = bySlug.id;
        }

        if (existingId) {
          await prisma.$transaction(async (tx) => {
            if (languages.length) await tx.casinoLanguage.deleteMany({ where: { casino_id: existingId } });
            if (bonuses.length) await tx.casinoBonus.deleteMany({ where: { casino_id: existingId } });
            if (features.length) await tx.casinoFeature.deleteMany({ where: { casino_id: existingId } });
            if (pros.length) await tx.casinoPros.deleteMany({ where: { casino_id: existingId } });
            if (cons.length) await tx.casinoCons.deleteMany({ where: { casino_id: existingId } });
            if (payment_methods.length) await tx.casinoPaymentMethod.deleteMany({ where: { casino_id: existingId } });
            if (currencies.length) await tx.casinoCurrency.deleteMany({ where: { casino_id: existingId } });
            if (game_providers.length) await tx.casinoGameProvider.deleteMany({ where: { casino_id: existingId } });
            if (faqs.length) await tx.casinoFaq.deleteMany({ where: { casino_id: existingId } });

            await tx.casino.update({
              where: { id: existingId },
              data: {
                ...casinoData,
                languages: languages.length ? { create: languages.map(l => ({ language: l })) } : undefined,
                bonuses: bonuses.length ? { create: bonuses.map(b => ({ title: b.title, type: b.type, amount: b.amount, bonus_code: b.bonus_code || null, wagering_requirement: b.wagering_requirement || null, sort_order: 0 })) } : undefined,
                features: features.length ? { create: features.map(f => ({ feature: f })) } : undefined,
                pros: pros.length ? { create: pros.map(p => ({ content: p })) } : undefined,
                cons: cons.length ? { create: cons.map(c => ({ content: c })) } : undefined,
                payment_methods: payment_methods.length ? { create: payment_methods.map(p => ({ method_name: p })) } : undefined,
                currencies: currencies.length ? { create: currencies.map(c => ({ currency_code: c })) } : undefined,
                game_providers: game_providers.length ? { create: game_providers.map(g => ({ provider_name: g })) } : undefined,
                faqs: faqs.length ? { create: faqs.map(f => ({ question: f.question, answer: f.answer, sort_order: 0 })) } : undefined,
              }
            });
          });
          results.success++;
        } else {
          if (!slug) {
            results.failed++;
            results.errors.push(`Skipped row "${row['Name'] || 'Unknown'}": Slug is required for new casinos`);
            continue;
          }
          await prisma.casino.create({
            data: {
              ...casinoData,
              languages: languages.length ? { create: languages.map(l => ({ language: l })) } : undefined,
              bonuses: bonuses.length ? { create: bonuses.map(b => ({ title: b.title, type: b.type, amount: b.amount, bonus_code: b.bonus_code || null, wagering_requirement: b.wagering_requirement || null, sort_order: 0 })) } : undefined,
              features: features.length ? { create: features.map(f => ({ feature: f })) } : undefined,
              pros: pros.length ? { create: pros.map(p => ({ content: p })) } : undefined,
              cons: cons.length ? { create: cons.map(c => ({ content: c })) } : undefined,
              payment_methods: payment_methods.length ? { create: payment_methods.map(p => ({ method_name: p })) } : undefined,
              currencies: currencies.length ? { create: currencies.map(c => ({ currency_code: c })) } : undefined,
              game_providers: game_providers.length ? { create: game_providers.map(g => ({ provider_name: g })) } : undefined,
              faqs: faqs.length ? { create: faqs.map(f => ({ question: f.question, answer: f.answer, sort_order: 0 })) } : undefined,
            }
          });
          results.success++;
        }
      } catch (error) {
        results.failed++;
        results.errors.push(`Failed to import row "${row['Name'] || 'Unknown'}": ${(error as Error).message}`);
        console.error('Error importing row:', error);
      }
    }

    res.json(results);
  } catch (error) {
    console.error('Error importing casinos:', error);
    res.status(500).json({ error: 'Failed to import casinos' });
  }
};

export const updateCasinoRanking = async (req: Request, res: Response) => {
  try {
    const { rankings } = req.body; // Array of { id: string, ranking_order: number }

    if (!Array.isArray(rankings)) {
      res.status(400).json({ error: 'Invalid rankings format' });
      return;
    }

    for (const item of rankings) {
      await prisma.casino.update({
        where: { id: item.id },
        data: { ranking_order: item.ranking_order }
      });
    }

    res.json({ message: 'Rankings updated successfully' });
  } catch (error) {
    console.error('Error updating rankings:', error);
    res.status(500).json({ error: 'Failed to update rankings' });
  }
};

export const updateCasinoPosition = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { position } = req.body; // 'top', 'middle', or 'bottom'

    if (!['top', 'middle', 'bottom'].includes(position)) {
      res.status(400).json({ error: 'Invalid position. Must be top, middle, or bottom' });
      return;
    }

    const casino = await prisma.casino.update({
      where: { id },
      data: { ranking_position: position }
    });

    res.json(casino);
  } catch (error) {
    console.error('Error updating position:', error);
    res.status(500).json({ error: 'Failed to update position' });
  }
};
