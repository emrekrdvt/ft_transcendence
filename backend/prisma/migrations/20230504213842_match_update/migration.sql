/*
  Warnings:

  - You are about to drop the column `isFinished` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the column `oppenentId` on the `matches` table. All the data in the column will be lost.
  - Added the required column `opponentId` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matches" DROP COLUMN "isFinished",
DROP COLUMN "oppenentId",
ADD COLUMN     "opponentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cash" INTEGER NOT NULL DEFAULT 0;
