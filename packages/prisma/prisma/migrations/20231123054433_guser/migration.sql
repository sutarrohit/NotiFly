-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "googleUserId" TEXT;

-- CreateTable
CREATE TABLE "google_users" (
    "id" TEXT NOT NULL,
    "userName" TEXT,
    "email" VARCHAR(255) NOT NULL,
    "googleLogin" BOOLEAN NOT NULL DEFAULT true,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT,

    CONSTRAINT "google_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "google_users_userName_idx" ON "google_users"("userName");

-- CreateIndex
CREATE INDEX "google_users_email_idx" ON "google_users"("email");

-- CreateIndex
CREATE INDEX "google_users_id_idx" ON "google_users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "google_users_email_key" ON "google_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "google_users_userName_key" ON "google_users"("userName");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_googleUserId_fkey" FOREIGN KEY ("googleUserId") REFERENCES "google_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
