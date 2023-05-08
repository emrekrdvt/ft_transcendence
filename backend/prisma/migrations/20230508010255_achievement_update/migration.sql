-- DropForeignKey
ALTER TABLE "achievemets" DROP CONSTRAINT "achievemets_userId_fkey";

-- AddForeignKey
ALTER TABLE "achievemets" ADD CONSTRAINT "achievemets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("intraId") ON DELETE RESTRICT ON UPDATE CASCADE;
