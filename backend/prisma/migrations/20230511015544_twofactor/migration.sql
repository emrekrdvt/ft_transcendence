/*
  Warnings:

  - A unique constraint covering the columns `[twoFactorSecret]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "twoFactorSecret" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_twoFactorSecret_key" ON "users"("twoFactorSecret");
