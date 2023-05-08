/*
  Warnings:

  - Added the required column `description` to the `achievemets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "achievemets" ADD COLUMN     "description" TEXT NOT NULL;
