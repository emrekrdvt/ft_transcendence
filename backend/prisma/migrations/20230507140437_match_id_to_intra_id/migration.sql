-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_userId_fkey";

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("intraId") ON DELETE RESTRICT ON UPDATE CASCADE;
