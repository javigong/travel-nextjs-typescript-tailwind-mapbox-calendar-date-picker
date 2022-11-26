/*
  Warnings:

  - A unique constraint covering the columns `[userEmail,sessionId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_userEmail_sessionId_key" ON "Booking"("userEmail", "sessionId");
