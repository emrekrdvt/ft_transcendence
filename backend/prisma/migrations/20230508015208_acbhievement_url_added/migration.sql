/*
  Warnings:

  - Added the required column `url` to the `achievemets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "achievemets" ADD COLUMN     "url" TEXT NOT NULL;
