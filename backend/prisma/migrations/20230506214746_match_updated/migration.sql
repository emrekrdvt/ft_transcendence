/*
  Warnings:

  - You are about to drop the column `opponent` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the column `opponentScore` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the column `userScore` on the `matches` table. All the data in the column will be lost.
  - Added the required column `player1` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player1EloChange` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player1Score` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player2` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player2EloChange` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player2Score` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matches" DROP COLUMN "opponent",
DROP COLUMN "opponentScore",
DROP COLUMN "userScore",
ADD COLUMN     "player1" TEXT NOT NULL,
ADD COLUMN     "player1EloChange" INTEGER NOT NULL,
ADD COLUMN     "player1Score" INTEGER NOT NULL,
ADD COLUMN     "player2" TEXT NOT NULL,
ADD COLUMN     "player2EloChange" INTEGER NOT NULL,
ADD COLUMN     "player2Score" INTEGER NOT NULL;
