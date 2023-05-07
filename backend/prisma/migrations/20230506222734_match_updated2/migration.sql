/*
  Warnings:

  - Added the required column `endMessage` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player1Elo` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player2Elo` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "endMessage" TEXT NOT NULL,
ADD COLUMN     "player1Elo" INTEGER NOT NULL,
ADD COLUMN     "player2Elo" INTEGER NOT NULL;
