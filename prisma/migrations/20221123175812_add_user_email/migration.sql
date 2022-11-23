/*
  Warnings:

  - You are about to drop the column `userId` on the `Hotel` table. All the data in the column will be lost.
  - You are about to alter the column `star` on the `Hotel` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - Added the required column `userEmail` to the `Hotel` table without a default value. This is not possible if the table is not empty.

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
    CONSTRAINT "Hotel_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Hotel" ("description", "hotelId", "id", "img", "lat", "location", "long", "price", "star", "title", "total") SELECT "description", "hotelId", "id", "img", "lat", "location", "long", "price", "star", "title", "total" FROM "Hotel";
DROP TABLE "Hotel";
ALTER TABLE "new_Hotel" RENAME TO "Hotel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
