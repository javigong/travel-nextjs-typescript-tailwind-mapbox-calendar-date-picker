-- CreateTable
CREATE TABLE "Hotel" (
    "id" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_id_key" ON "Hotel"("id");
