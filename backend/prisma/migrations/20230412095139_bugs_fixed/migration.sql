/*
  Warnings:

  - You are about to drop the column `loses` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "loses",
ADD COLUMN     "losses" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rank" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "rating" SET DEFAULT 1500;
