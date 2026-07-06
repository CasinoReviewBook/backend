-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100),
    "email" VARCHAR(255) NOT NULL,
    "password_hash" TEXT,
    "role" VARCHAR(20) DEFAULT 'user',
    "avatar" TEXT,
    "status" VARCHAR(20) DEFAULT 'active',
    "email_verified" BOOLEAN DEFAULT false,
    "last_login" TIMESTAMP,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Casino" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),
    "slug" VARCHAR(255),
    "logo" TEXT,
    "featured_image" TEXT,
    "website_url" TEXT,
    "affiliate_url" TEXT,
    "affiliate_program_name" VARCHAR(255),
    "affiliate_program_link" TEXT,
    "short_description" TEXT,
    "overview" TEXT,
    "editor_view" TEXT,
    "rating" DECIMAL(2,1),
    "visits" INTEGER DEFAULT 0,
    "established_year" INTEGER,
    "company_name" VARCHAR(255),
    "license_authority" VARCHAR(255),
    "minimum_deposit" DECIMAL(10,2),
    "withdrawal_time" VARCHAR(100),
    "support_methods" TEXT[],
    "status" VARCHAR(20) DEFAULT 'active',
    "featured" BOOLEAN DEFAULT false,
    "hot_casino" BOOLEAN DEFAULT false,
    "recommended_by_experts" BOOLEAN DEFAULT false,
    "certified_casino" BOOLEAN DEFAULT false,
    "mobile_friendly" BOOLEAN DEFAULT false,
    "crypto_supported" BOOLEAN DEFAULT false,
    "live_casino" BOOLEAN DEFAULT false,
    "sports_betting" BOOLEAN DEFAULT false,
    "responsible_gaming" BOOLEAN DEFAULT false,
    "meta_title" VARCHAR(255),
    "meta_description" TEXT,
    "meta_keywords" TEXT[],
    "created_by" UUID,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "Casino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoLanguage" (
    "id" UUID NOT NULL,
    "casino_id" UUID NOT NULL,
    "language" VARCHAR(100) NOT NULL,

    CONSTRAINT "CasinoLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoBonus" (
    "id" UUID NOT NULL,
    "casino_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "amount" VARCHAR(100) NOT NULL,
    "bonus_code" VARCHAR(100),
    "wagering_requirement" VARCHAR(100),
    "sort_order" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "CasinoBonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoFeature" (
    "id" UUID NOT NULL,
    "casino_id" UUID NOT NULL,
    "feature" VARCHAR(255) NOT NULL,

    CONSTRAINT "CasinoFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoPros" (
    "id" UUID NOT NULL,
    "casino_id" UUID NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "CasinoPros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoCons" (
    "id" UUID NOT NULL,
    "casino_id" UUID NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "CasinoCons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoPaymentMethod" (
    "id" UUID NOT NULL,
    "casino_id" UUID NOT NULL,
    "method_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "CasinoPaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoCurrency" (
    "id" UUID NOT NULL,
    "casino_id" UUID NOT NULL,
    "currency_code" VARCHAR(20) NOT NULL,

    CONSTRAINT "CasinoCurrency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoGameProvider" (
    "id" UUID NOT NULL,
    "casino_id" UUID NOT NULL,
    "provider_name" VARCHAR(150) NOT NULL,

    CONSTRAINT "CasinoGameProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoTag" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,

    CONSTRAINT "CasinoTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoTagMapping" (
    "casino_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "CasinoTagMapping_pkey" PRIMARY KEY ("casino_id","tag_id")
);

-- CreateTable
CREATE TABLE "CasinoCategory" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100),
    "slug" VARCHAR(100),
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CasinoCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoCategoryMapping" (
    "casino_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,

    CONSTRAINT "CasinoCategoryMapping_pkey" PRIMARY KEY ("casino_id","category_id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" UUID NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "code" VARCHAR(10) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoAvailableCountry" (
    "casino_id" UUID NOT NULL,
    "country_id" UUID NOT NULL,

    CONSTRAINT "CasinoAvailableCountry_pkey" PRIMARY KEY ("casino_id","country_id")
);

-- CreateTable
CREATE TABLE "CasinoRestrictedCountry" (
    "casino_id" UUID NOT NULL,
    "country_id" UUID NOT NULL,

    CONSTRAINT "CasinoRestrictedCountry_pkey" PRIMARY KEY ("casino_id","country_id")
);

-- CreateTable
CREATE TABLE "CasinoScreenshot" (
    "id" UUID NOT NULL,
    "casino_id" UUID NOT NULL,
    "image_url" TEXT NOT NULL,
    "sort_order" INTEGER DEFAULT 0,

    CONSTRAINT "CasinoScreenshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoGalleryVideo" (
    "id" UUID NOT NULL,
    "casino_id" UUID NOT NULL,
    "video_url" TEXT NOT NULL,
    "title" VARCHAR(255),
    "sort_order" INTEGER DEFAULT 0,

    CONSTRAINT "CasinoGalleryVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoFaq" (
    "id" UUID NOT NULL,
    "casino_id" UUID NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sort_order" INTEGER DEFAULT 0,

    CONSTRAINT "CasinoFaq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoBadge" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,

    CONSTRAINT "CasinoBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoBadgeMapping" (
    "casino_id" UUID NOT NULL,
    "badge_id" UUID NOT NULL,

    CONSTRAINT "CasinoBadgeMapping_pkey" PRIMARY KEY ("casino_id","badge_id")
);

-- CreateTable
CREATE TABLE "CasinoReviewsSummary" (
    "casino_id" UUID NOT NULL,
    "average_rating" DECIMAL(2,1),
    "total_reviews" INTEGER DEFAULT 0,
    "total_clicks" INTEGER DEFAULT 0,
    "total_views" INTEGER DEFAULT 0,

    CONSTRAINT "CasinoReviewsSummary_pkey" PRIMARY KEY ("casino_id")
);

-- CreateTable
CREATE TABLE "AffiliateLink" (
    "id" UUID NOT NULL,
    "casino_id" UUID,
    "title" VARCHAR(255),
    "affiliate_url" TEXT,
    "button_text" VARCHAR(100),
    "clicks" INTEGER DEFAULT 0,
    "status" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "AffiliateLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AffiliateClick" (
    "id" UUID NOT NULL,
    "affiliate_link_id" UUID,
    "user_id" UUID,
    "ip_address" VARCHAR(100),
    "country" VARCHAR(100),
    "device" VARCHAR(50),
    "clicked_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AffiliateClick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" UUID NOT NULL,
    "casino_id" UUID,
    "author_id" UUID,
    "title" VARCHAR(255),
    "slug" VARCHAR(255),
    "featured_image" TEXT,
    "content" TEXT,
    "rating" DECIMAL(2,1),
    "meta_title" VARCHAR(255),
    "meta_description" TEXT,
    "status" VARCHAR(20) DEFAULT 'draft',
    "published_at" TIMESTAMP,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" UUID NOT NULL,
    "author_id" UUID,
    "title" VARCHAR(255),
    "slug" VARCHAR(255),
    "featured_image" TEXT,
    "excerpt" TEXT,
    "content" TEXT,
    "meta_title" VARCHAR(255),
    "meta_description" TEXT,
    "status" VARCHAR(20) DEFAULT 'draft',
    "published_at" TIMESTAMP,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" UUID NOT NULL,
    "author_id" UUID,
    "title" VARCHAR(255),
    "slug" VARCHAR(255),
    "featured_image" TEXT,
    "content" TEXT,
    "meta_title" VARCHAR(255),
    "meta_description" TEXT,
    "status" VARCHAR(20) DEFAULT 'draft',
    "published_at" TIMESTAMP,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" UUID NOT NULL,
    "question" TEXT,
    "answer" TEXT,
    "category" VARCHAR(100),
    "sort_order" INTEGER DEFAULT 0,
    "status" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banner" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255),
    "image_url" TEXT,
    "redirect_url" TEXT,
    "position" VARCHAR(100),
    "status" BOOLEAN DEFAULT true,
    "start_date" TIMESTAMP,
    "end_date" TIMESTAMP,
    "clicks" INTEGER DEFAULT 0,
    "impressions" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "blog_id" UUID,
    "review_id" UUID,
    "comment" TEXT,
    "status" VARCHAR(20) DEFAULT 'pending',
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaLibrary" (
    "id" UUID NOT NULL,
    "file_name" VARCHAR(255),
    "file_url" TEXT,
    "file_type" VARCHAR(50),
    "file_size" BIGINT,
    "uploaded_by" UUID,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MediaLibrary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeoMeta" (
    "id" UUID NOT NULL,
    "entity_type" VARCHAR(50),
    "entity_id" UUID,
    "meta_title" VARCHAR(255),
    "meta_description" TEXT,
    "canonical_url" TEXT,
    "og_image" TEXT,
    "keywords" TEXT[],
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "SeoMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "site_name" VARCHAR(255),
    "site_logo" TEXT,
    "favicon" TEXT,
    "contact_email" VARCHAR(255),
    "footer_text" TEXT,
    "facebook_url" TEXT,
    "twitter_url" TEXT,
    "instagram_url" TEXT,
    "maintenance_mode" BOOLEAN DEFAULT false,
    "updated_at" TIMESTAMP,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" UUID NOT NULL,
    "admin_id" UUID,
    "action" VARCHAR(255),
    "table_name" VARCHAR(100),
    "record_id" UUID,
    "old_data" JSONB,
    "new_data" JSONB,
    "ip_address" VARCHAR(100),
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "subscribed_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteCasino" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "casino_id" UUID NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteCasino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailCampaign" (
    "id" UUID NOT NULL,
    "subject" VARCHAR(255),
    "body" TEXT,
    "status" VARCHAR(20) DEFAULT 'draft',
    "target" VARCHAR(50) DEFAULT 'newsletter',
    "sent_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "EmailCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Casino_slug_key" ON "Casino"("slug");

-- CreateIndex
CREATE INDEX "Casino_slug_idx" ON "Casino"("slug");

-- CreateIndex
CREATE INDEX "Casino_featured_idx" ON "Casino"("featured");

-- CreateIndex
CREATE INDEX "Casino_status_idx" ON "Casino"("status");

-- CreateIndex
CREATE INDEX "Casino_rating_idx" ON "Casino"("rating");

-- CreateIndex
CREATE INDEX "Casino_created_at_idx" ON "Casino"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "CasinoTag_slug_key" ON "CasinoTag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CasinoBadge_slug_key" ON "CasinoBadge"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Review_slug_key" ON "Review"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteCasino_user_id_casino_id_key" ON "FavoriteCasino"("user_id", "casino_id");

-- AddForeignKey
ALTER TABLE "Casino" ADD CONSTRAINT "Casino_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoLanguage" ADD CONSTRAINT "CasinoLanguage_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoBonus" ADD CONSTRAINT "CasinoBonus_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoFeature" ADD CONSTRAINT "CasinoFeature_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoPros" ADD CONSTRAINT "CasinoPros_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoCons" ADD CONSTRAINT "CasinoCons_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoPaymentMethod" ADD CONSTRAINT "CasinoPaymentMethod_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoCurrency" ADD CONSTRAINT "CasinoCurrency_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoGameProvider" ADD CONSTRAINT "CasinoGameProvider_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoTagMapping" ADD CONSTRAINT "CasinoTagMapping_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoTagMapping" ADD CONSTRAINT "CasinoTagMapping_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "CasinoTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoCategoryMapping" ADD CONSTRAINT "CasinoCategoryMapping_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoCategoryMapping" ADD CONSTRAINT "CasinoCategoryMapping_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "CasinoCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoAvailableCountry" ADD CONSTRAINT "CasinoAvailableCountry_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoAvailableCountry" ADD CONSTRAINT "CasinoAvailableCountry_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoRestrictedCountry" ADD CONSTRAINT "CasinoRestrictedCountry_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoRestrictedCountry" ADD CONSTRAINT "CasinoRestrictedCountry_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoScreenshot" ADD CONSTRAINT "CasinoScreenshot_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoGalleryVideo" ADD CONSTRAINT "CasinoGalleryVideo_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoFaq" ADD CONSTRAINT "CasinoFaq_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoBadgeMapping" ADD CONSTRAINT "CasinoBadgeMapping_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoBadgeMapping" ADD CONSTRAINT "CasinoBadgeMapping_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "CasinoBadge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoReviewsSummary" ADD CONSTRAINT "CasinoReviewsSummary_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliateLink" ADD CONSTRAINT "AffiliateLink_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliateClick" ADD CONSTRAINT "AffiliateClick_affiliate_link_id_fkey" FOREIGN KEY ("affiliate_link_id") REFERENCES "AffiliateLink"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliateClick" ADD CONSTRAINT "AffiliateClick_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "Blog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaLibrary" ADD CONSTRAINT "MediaLibrary_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteCasino" ADD CONSTRAINT "FavoriteCasino_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteCasino" ADD CONSTRAINT "FavoriteCasino_casino_id_fkey" FOREIGN KEY ("casino_id") REFERENCES "Casino"("id") ON DELETE CASCADE ON UPDATE CASCADE;
