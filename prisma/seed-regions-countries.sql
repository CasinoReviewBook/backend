-- =============================================
-- Seed Regions and Countries
-- =============================================

-- Insert Regions (skip if already exists by name)
INSERT INTO "Region" (id, name, slug, "createdAt", "updatedAt") VALUES
  (gen_random_uuid(), 'Europe', 'europe', NOW(), NOW()),
  (gen_random_uuid(), 'North America', 'north-america', NOW(), NOW()),
  (gen_random_uuid(), 'South America', 'south-america', NOW(), NOW()),
  (gen_random_uuid(), 'Central America', 'central-america', NOW(), NOW()),
  (gen_random_uuid(), 'Caribbean', 'caribbean', NOW(), NOW()),
  (gen_random_uuid(), 'Oceania', 'oceania', NOW(), NOW()),
  (gen_random_uuid(), 'South Asia', 'south-asia', NOW(), NOW()),
  (gen_random_uuid(), 'Middle East', 'middle-east', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- =============================================
-- North America
-- =============================================
INSERT INTO "Country" (id, name, code, "regionId") VALUES
  (gen_random_uuid(), 'Canada', 'CA', (SELECT id FROM "Region" WHERE slug = 'north-america')),
  (gen_random_uuid(), 'United States', 'US', (SELECT id FROM "Region" WHERE slug = 'north-america')),
  (gen_random_uuid(), 'Mexico', 'MX', (SELECT id FROM "Region" WHERE slug = 'north-america'))
ON CONFLICT (code) DO UPDATE SET "regionId" = EXCLUDED."regionId";

-- =============================================
-- Central America
-- =============================================
INSERT INTO "Country" (id, name, code, "regionId") VALUES
  (gen_random_uuid(), 'Belize', 'BZ', (SELECT id FROM "Region" WHERE slug = 'central-america')),
  (gen_random_uuid(), 'Costa Rica', 'CR', (SELECT id FROM "Region" WHERE slug = 'central-america')),
  (gen_random_uuid(), 'El Salvador', 'SV', (SELECT id FROM "Region" WHERE slug = 'central-america')),
  (gen_random_uuid(), 'Guatemala', 'GT', (SELECT id FROM "Region" WHERE slug = 'central-america')),
  (gen_random_uuid(), 'Honduras', 'HN', (SELECT id FROM "Region" WHERE slug = 'central-america')),
  (gen_random_uuid(), 'Nicaragua', 'NI', (SELECT id FROM "Region" WHERE slug = 'central-america')),
  (gen_random_uuid(), 'Panama', 'PA', (SELECT id FROM "Region" WHERE slug = 'central-america'))
ON CONFLICT (code) DO UPDATE SET "regionId" = EXCLUDED."regionId";

-- =============================================
-- Caribbean
-- =============================================
INSERT INTO "Country" (id, name, code, "regionId") VALUES
  (gen_random_uuid(), 'Antigua and Barbuda', 'AG', (SELECT id FROM "Region" WHERE slug = 'caribbean')),
  (gen_random_uuid(), 'Bahamas', 'BS', (SELECT id FROM "Region" WHERE slug = 'caribbean')),
  (gen_random_uuid(), 'Barbados', 'BB', (SELECT id FROM "Region" WHERE slug = 'caribbean')),
  (gen_random_uuid(), 'Cuba', 'CU', (SELECT id FROM "Region" WHERE slug = 'caribbean')),
  (gen_random_uuid(), 'Dominica', 'DM', (SELECT id FROM "Region" WHERE slug = 'caribbean')),
  (gen_random_uuid(), 'Dominican Republic', 'DO', (SELECT id FROM "Region" WHERE slug = 'caribbean')),
  (gen_random_uuid(), 'Grenada', 'GD', (SELECT id FROM "Region" WHERE slug = 'caribbean')),
  (gen_random_uuid(), 'Haiti', 'HT', (SELECT id FROM "Region" WHERE slug = 'caribbean')),
  (gen_random_uuid(), 'Jamaica', 'JM', (SELECT id FROM "Region" WHERE slug = 'caribbean')),
  (gen_random_uuid(), 'Saint Kitts and Nevis', 'KN', (SELECT id FROM "Region" WHERE slug = 'caribbean')),
  (gen_random_uuid(), 'Saint Lucia', 'LC', (SELECT id FROM "Region" WHERE slug = 'caribbean')),
  (gen_random_uuid(), 'Saint Vincent and the Grenadines', 'VC', (SELECT id FROM "Region" WHERE slug = 'caribbean')),
  (gen_random_uuid(), 'Trinidad and Tobago', 'TT', (SELECT id FROM "Region" WHERE slug = 'caribbean'))
ON CONFLICT (code) DO UPDATE SET "regionId" = EXCLUDED."regionId";

-- =============================================
-- South America
-- =============================================
INSERT INTO "Country" (id, name, code, "regionId") VALUES
  (gen_random_uuid(), 'Argentina', 'AR', (SELECT id FROM "Region" WHERE slug = 'south-america')),
  (gen_random_uuid(), 'Bolivia', 'BO', (SELECT id FROM "Region" WHERE slug = 'south-america')),
  (gen_random_uuid(), 'Brazil', 'BR', (SELECT id FROM "Region" WHERE slug = 'south-america')),
  (gen_random_uuid(), 'Chile', 'CL', (SELECT id FROM "Region" WHERE slug = 'south-america')),
  (gen_random_uuid(), 'Colombia', 'CO', (SELECT id FROM "Region" WHERE slug = 'south-america')),
  (gen_random_uuid(), 'Ecuador', 'EC', (SELECT id FROM "Region" WHERE slug = 'south-america')),
  (gen_random_uuid(), 'Guyana', 'GY', (SELECT id FROM "Region" WHERE slug = 'south-america')),
  (gen_random_uuid(), 'Paraguay', 'PY', (SELECT id FROM "Region" WHERE slug = 'south-america')),
  (gen_random_uuid(), 'Peru', 'PE', (SELECT id FROM "Region" WHERE slug = 'south-america')),
  (gen_random_uuid(), 'Suriname', 'SR', (SELECT id FROM "Region" WHERE slug = 'south-america')),
  (gen_random_uuid(), 'Uruguay', 'UY', (SELECT id FROM "Region" WHERE slug = 'south-america')),
  (gen_random_uuid(), 'Venezuela', 'VE', (SELECT id FROM "Region" WHERE slug = 'south-america'))
ON CONFLICT (code) DO UPDATE SET "regionId" = EXCLUDED."regionId";

-- =============================================
-- Oceania
-- =============================================
INSERT INTO "Country" (id, name, code, "regionId") VALUES
  (gen_random_uuid(), 'Australia', 'AU', (SELECT id FROM "Region" WHERE slug = 'oceania')),
  (gen_random_uuid(), 'New Zealand', 'NZ', (SELECT id FROM "Region" WHERE slug = 'oceania'))
ON CONFLICT (code) DO UPDATE SET "regionId" = EXCLUDED."regionId";

-- =============================================
-- Europe
-- =============================================
INSERT INTO "Country" (id, name, code, "regionId") VALUES
  (gen_random_uuid(), 'Albania', 'AL', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Andorra', 'AD', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Austria', 'AT', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Belarus', 'BY', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Belgium', 'BE', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Bosnia and Herzegovina', 'BA', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Bulgaria', 'BG', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Croatia', 'HR', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Cyprus', 'CY', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Czech Republic', 'CZ', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Denmark', 'DK', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Estonia', 'EE', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Finland', 'FI', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'France', 'FR', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Germany', 'DE', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Greece', 'GR', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Hungary', 'HU', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Iceland', 'IS', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Ireland', 'IE', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Italy', 'IT', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Latvia', 'LV', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Liechtenstein', 'LI', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Lithuania', 'LT', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Luxembourg', 'LU', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Malta', 'MT', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Moldova', 'MD', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Monaco', 'MC', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Montenegro', 'ME', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Netherlands', 'NL', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'North Macedonia', 'MK', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Norway', 'NO', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Poland', 'PL', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Portugal', 'PT', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Romania', 'RO', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'San Marino', 'SM', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Serbia', 'RS', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Slovakia', 'SK', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Slovenia', 'SI', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Spain', 'ES', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Sweden', 'SE', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Switzerland', 'CH', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'Ukraine', 'UA', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'United Kingdom (UK)', 'GB', (SELECT id FROM "Region" WHERE slug = 'europe')),
  (gen_random_uuid(), 'European Countries (General)', 'EU', (SELECT id FROM "Region" WHERE slug = 'europe'))
ON CONFLICT (code) DO UPDATE SET "regionId" = EXCLUDED."regionId";

-- =============================================
-- South Asia
-- =============================================
INSERT INTO "Country" (id, name, code, "regionId") VALUES
  (gen_random_uuid(), 'India', 'IN', (SELECT id FROM "Region" WHERE slug = 'south-asia')),
  (gen_random_uuid(), 'Pakistan', 'PK', (SELECT id FROM "Region" WHERE slug = 'south-asia')),
  (gen_random_uuid(), 'Bangladesh', 'BD', (SELECT id FROM "Region" WHERE slug = 'south-asia')),
  (gen_random_uuid(), 'Sri Lanka', 'LK', (SELECT id FROM "Region" WHERE slug = 'south-asia')),
  (gen_random_uuid(), 'Nepal', 'NP', (SELECT id FROM "Region" WHERE slug = 'south-asia')),
  (gen_random_uuid(), 'Bhutan', 'BT', (SELECT id FROM "Region" WHERE slug = 'south-asia')),
  (gen_random_uuid(), 'Maldives', 'MV', (SELECT id FROM "Region" WHERE slug = 'south-asia'))
ON CONFLICT (code) DO UPDATE SET "regionId" = EXCLUDED."regionId";

-- =============================================
-- Middle East
-- =============================================
INSERT INTO "Country" (id, name, code, "regionId") VALUES
  (gen_random_uuid(), 'Saudi Arabia', 'SA', (SELECT id FROM "Region" WHERE slug = 'middle-east')),
  (gen_random_uuid(), 'United Arab Emirates', 'AE', (SELECT id FROM "Region" WHERE slug = 'middle-east')),
  (gen_random_uuid(), 'Qatar', 'QA', (SELECT id FROM "Region" WHERE slug = 'middle-east')),
  (gen_random_uuid(), 'Kuwait', 'KW', (SELECT id FROM "Region" WHERE slug = 'middle-east')),
  (gen_random_uuid(), 'Bahrain', 'BH', (SELECT id FROM "Region" WHERE slug = 'middle-east')),
  (gen_random_uuid(), 'Oman', 'OM', (SELECT id FROM "Region" WHERE slug = 'middle-east')),
  (gen_random_uuid(), 'Yemen', 'YE', (SELECT id FROM "Region" WHERE slug = 'middle-east')),
  (gen_random_uuid(), 'Iraq', 'IQ', (SELECT id FROM "Region" WHERE slug = 'middle-east')),
  (gen_random_uuid(), 'Jordan', 'JO', (SELECT id FROM "Region" WHERE slug = 'middle-east')),
  (gen_random_uuid(), 'Lebanon', 'LB', (SELECT id FROM "Region" WHERE slug = 'middle-east')),
  (gen_random_uuid(), 'Israel', 'IL', (SELECT id FROM "Region" WHERE slug = 'middle-east')),
  (gen_random_uuid(), 'Palestine', 'PS', (SELECT id FROM "Region" WHERE slug = 'middle-east')),
  (gen_random_uuid(), 'Iran', 'IR', (SELECT id FROM "Region" WHERE slug = 'middle-east')),
  (gen_random_uuid(), 'Egypt', 'EG', (SELECT id FROM "Region" WHERE slug = 'middle-east'))
ON CONFLICT (code) DO UPDATE SET "regionId" = EXCLUDED."regionId";
