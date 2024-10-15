-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "images" TEXT[],
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
