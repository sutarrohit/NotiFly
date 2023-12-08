/*
  Warnings:

  - You are about to drop the column `email` on the `notifications` table. All the data in the column will be lost.
  - Added the required column `receiverEmail` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Made the column `CreatedAt` on table `notifications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "email",
ADD COLUMN     "receiverEmail" TEXT NOT NULL,
ALTER COLUMN "CreatedAt" SET NOT NULL;
