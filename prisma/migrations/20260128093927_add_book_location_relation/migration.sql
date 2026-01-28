/*
  Warnings:

  - You are about to drop the column `bookLocation` on the `Book` table. All the data in the column will be lost.
  - Added the required column `bookLocationId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "bookLocation",
ADD COLUMN     "bookLocationId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "BookLocation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BookLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookLocation_name_key" ON "BookLocation"("name");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_bookLocationId_fkey" FOREIGN KEY ("bookLocationId") REFERENCES "BookLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
