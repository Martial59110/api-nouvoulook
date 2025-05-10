/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Picto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Picto_url_key" ON "Picto"("url");
