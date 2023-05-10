/*
  Warnings:

  - Added the required column `player1XPChange` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player2XPChange` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "player1XPChange" INTEGER NOT NULL,
ADD COLUMN     "player2XPChange" INTEGER NOT NULL;
