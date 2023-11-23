/*
  Warnings:

  - You are about to drop the column `googleAuth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordChangedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetTokenExpires` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.
  - The `emailVerified` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "User_email_idx";

-- DropIndex
DROP INDEX "User_id_idx";

-- DropIndex
DROP INDEX "User_passwordResetToken_key";

-- DropIndex
DROP INDEX "User_userName_email_key";

-- DropIndex
DROP INDEX "User_userName_idx";

-- DropIndex
DROP INDEX "User_userName_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "googleAuth",
DROP COLUMN "password",
DROP COLUMN "passwordChangedAt",
DROP COLUMN "passwordResetToken",
DROP COLUMN "passwordResetTokenExpires",
DROP COLUMN "userName",
DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" TIMESTAMP(3);
