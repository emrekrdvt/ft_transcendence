/*
  Warnings:

  - Changed the type of `intraId` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "intraId",
ADD COLUMN     "intraId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_intraId_key" ON "users"("intraId");
