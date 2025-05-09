/*
  Warnings:

  - You are about to drop the column `created_at` on the `page_views` table. All the data in the column will be lost.
  - You are about to drop the column `ip_address` on the `page_views` table. All the data in the column will be lost.
  - You are about to drop the column `user_agent` on the `page_views` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "page_views_created_at_idx";

-- AlterTable
ALTER TABLE "page_views" DROP COLUMN "created_at",
DROP COLUMN "ip_address",
DROP COLUMN "user_agent",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "userAgent" TEXT;

-- CreateIndex
CREATE INDEX "page_views_ipAddress_userAgent_createdAt_idx" ON "page_views"("ipAddress", "userAgent", "createdAt");
