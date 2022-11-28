-- CreateTable
CREATE TABLE "Account" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "type" STRING NOT NULL,
    "provider" STRING NOT NULL,
    "providerAccountId" STRING NOT NULL,
    "refresh_token" STRING,
    "access_token" STRING,
    "expires_at" INT4,
    "token_type" STRING,
    "scope" STRING,
    "id_token" STRING,
    "session_state" STRING,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" STRING NOT NULL,
    "sessionToken" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "id" STRING NOT NULL,
    "hotelId" STRING NOT NULL,
    "description" STRING NOT NULL,
    "img" STRING NOT NULL,
    "lat" FLOAT8 NOT NULL,
    "location" STRING NOT NULL,
    "long" FLOAT8 NOT NULL,
    "price" STRING NOT NULL,
    "star" FLOAT8 NOT NULL,
    "title" STRING NOT NULL,
    "total" FLOAT8 NOT NULL,
    "userEmail" STRING NOT NULL,
    "cityId" STRING NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userEmail" STRING NOT NULL,
    "sessionId" STRING NOT NULL,
    "amountTotal" FLOAT8 NOT NULL,
    "images" STRING NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING,
    "email" STRING,
    "emailVerified" TIMESTAMP(3),
    "image" STRING,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" STRING NOT NULL,
    "token" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_hotelId_userEmail_key" ON "Hotel"("hotelId", "userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_sessionId_key" ON "Booking"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
