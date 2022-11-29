/*
  Warnings:

  - You are about to drop the column `amountTotal` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotelId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `star` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "amountTotal";
ALTER TABLE "Booking" DROP COLUMN "images";
ALTER TABLE "Booking" ADD COLUMN     "cityId" STRING NOT NULL;
ALTER TABLE "Booking" ADD COLUMN     "description" STRING NOT NULL;
ALTER TABLE "Booking" ADD COLUMN     "endDate" STRING NOT NULL;
ALTER TABLE "Booking" ADD COLUMN     "hotelId" STRING NOT NULL;
ALTER TABLE "Booking" ADD COLUMN     "img" STRING NOT NULL;
ALTER TABLE "Booking" ADD COLUMN     "lat" FLOAT8 NOT NULL;
ALTER TABLE "Booking" ADD COLUMN     "location" STRING NOT NULL;
ALTER TABLE "Booking" ADD COLUMN     "long" FLOAT8 NOT NULL;
ALTER TABLE "Booking" ADD COLUMN     "price" STRING NOT NULL;
ALTER TABLE "Booking" ADD COLUMN     "star" FLOAT8 NOT NULL;
ALTER TABLE "Booking" ADD COLUMN     "startDate" STRING NOT NULL;
ALTER TABLE "Booking" ADD COLUMN     "title" STRING NOT NULL;
ALTER TABLE "Booking" ADD COLUMN     "total" FLOAT8 NOT NULL;
