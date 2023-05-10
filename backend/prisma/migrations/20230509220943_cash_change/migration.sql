/*
  Warnings:

  - Added the required column `player1CashChange` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player2CashChange` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "player1CashChange" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "player2CashChange" DOUBLE PRECISION NOT NULL;
