/*
  Warnings:

  - Added the required column `hotelId` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hotel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hotelId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "lat" INTEGER NOT NULL,
    "location" INTEGER NOT NULL,
    "long" INTEGER NOT NULL,
    "price" TEXT NOT NULL,
    "star" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Hotel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Hotel" ("description", "id", "img", "lat", "location", "long", "price", "star", "title", "total", "userId") SELECT "description", "id", "img", "lat", "location", "long", "price", "star", "title", "total", "userId" FROM "Hotel";
DROP TABLE "Hotel";
ALTER TABLE "new_Hotel" RENAME TO "Hotel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
