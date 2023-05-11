-- AlterTable
ALTER TABLE "users" ADD COLUMN     "about" TEXT,
ADD COLUMN     "twoFactor" BOOLEAN NOT NULL DEFAULT false;
