/*
  Warnings:

  - You are about to alter the column `total` on the `Hotel` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

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
    "total" REAL NOT NULL,
    "userEmail" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    CONSTRAINT "Hotel_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Hotel" ("cityId", "description", "hotelId", "id", "img", "lat", "location", "long", "price", "star", "title", "total", "userEmail") SELECT "cityId", "description", "hotelId", "id", "img", "lat", "location", "long", "price", "star", "title", "total", "userEmail" FROM "Hotel";
DROP TABLE "Hotel";
ALTER TABLE "new_Hotel" RENAME TO "Hotel";
CREATE UNIQUE INDEX "Hotel_hotelId_userEmail_key" ON "Hotel"("hotelId", "userEmail");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
