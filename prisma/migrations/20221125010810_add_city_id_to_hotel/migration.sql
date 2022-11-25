/*
  Warnings:

  - Added the required column `cityId` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hotel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hotelId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "location" TEXT NOT NULL,
    "long" REAL NOT NULL,
    "price" TEXT NOT NULL,
    "star" REAL NOT NULL,
    "title" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    CONSTRAINT "Hotel_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Hotel" ("description", "hotelId", "id", "img", "lat", "location", "long", "price", "star", "title", "total", "userEmail") SELECT "description", "hotelId", "id", "img", "lat", "location", "long", "price", "star", "title", "total", "userEmail" FROM "Hotel";
DROP TABLE "Hotel";
ALTER TABLE "new_Hotel" RENAME TO "Hotel";
CREATE UNIQUE INDEX "Hotel_hotelId_userEmail_key" ON "Hotel"("hotelId", "userEmail");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
