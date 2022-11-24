/*
  Warnings:

  - A unique constraint covering the columns `[hotelId,userEmail]` on the table `Hotel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Hotel_userEmail_hotelId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_hotelId_userEmail_key" ON "Hotel"("hotelId", "userEmail");
