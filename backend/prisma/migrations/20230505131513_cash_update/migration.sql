/*
  Warnings:

  - You are about to drop the column `rank` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "rank",
ALTER COLUMN "cash" SET DEFAULT 0,
ALTER COLUMN "cash" SET DATA TYPE DOUBLE PRECISION;
