/*
  Warnings:

  - Added the required column `player1AvatarUrl` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player2AvatarUrl` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "player1AvatarUrl" TEXT NOT NULL,
ADD COLUMN     "player2AvatarUrl" TEXT NOT NULL;
