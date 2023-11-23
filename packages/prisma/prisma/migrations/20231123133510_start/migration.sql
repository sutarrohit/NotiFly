-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "salt" TEXT,
    "avatar" TEXT,
    "passwordChangedAt" TIMESTAMP(3),
    "passwordResetToken" TEXT,
    "passwordResetTokenExpires" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "targetPrice" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "cryptoTokenId" INTEGER NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crypto_token" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,

    CONSTRAINT "crypto_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_userName_idx" ON "users"("userName");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_id_idx" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "users_passwordResetToken_key" ON "users"("passwordResetToken");

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_email_key" ON "users"("userName", "email");

-- CreateIndex
CREATE INDEX "crypto_token_symbol_idx" ON "crypto_token"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "crypto_token_symbol_key" ON "crypto_token"("symbol");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_cryptoTokenId_fkey" FOREIGN KEY ("cryptoTokenId") REFERENCES "crypto_token"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
