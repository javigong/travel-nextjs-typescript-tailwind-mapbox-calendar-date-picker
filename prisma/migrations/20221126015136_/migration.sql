/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Booking_userEmail_sessionId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Booking_sessionId_key" ON "Booking"("sessionId");
