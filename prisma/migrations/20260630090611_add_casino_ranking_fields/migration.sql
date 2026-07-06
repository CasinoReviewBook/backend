-- AlterTable
ALTER TABLE "Casino" ADD COLUMN     "ranking_order" INTEGER DEFAULT 0,
ADD COLUMN     "ranking_position" VARCHAR(20) DEFAULT 'middle';
