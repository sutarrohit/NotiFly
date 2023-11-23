/*
  Warnings:

  - The `emailVerified` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[passwordResetToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName,email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleAuth" BOOLEAN DEFAULT true,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "passwordChangedAt" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT,
ADD COLUMN     "passwordResetTokenExpires" TIMESTAMP(3),
ADD COLUMN     "userName" TEXT,
DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "User_userName_idx" ON "User"("userName");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_passwordResetToken_key" ON "User"("passwordResetToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_email_key" ON "User"("userName", "email");
