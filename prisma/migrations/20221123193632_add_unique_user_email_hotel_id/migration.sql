/*
  Warnings:

  - A unique constraint covering the columns `[userEmail,hotelId]` on the table `Hotel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Hotel_hotelId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_userEmail_hotelId_key" ON "Hotel"("userEmail", "hotelId");
