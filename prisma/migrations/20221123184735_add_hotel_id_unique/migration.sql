/*
  Warnings:

  - A unique constraint covering the columns `[hotelId]` on the table `Hotel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Hotel_hotelId_key" ON "Hotel"("hotelId");
