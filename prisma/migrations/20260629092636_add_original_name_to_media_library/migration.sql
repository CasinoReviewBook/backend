-- AlterTable
ALTER TABLE "MediaLibrary" ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "folder" VARCHAR(100),
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "mime_type" VARCHAR(100),
ADD COLUMN     "original_name" VARCHAR(255),
ADD COLUMN     "updated_at" TIMESTAMP,
ADD COLUMN     "width" INTEGER;
