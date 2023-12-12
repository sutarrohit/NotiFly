/*
  Warnings:

  - Added the required column `Uptrend` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "Uptrend" BOOLEAN NOT NULL;
