/*
  Warnings:

  - Changed the type of `category` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Programming', 'SoftwareEngineering', 'Frontend', 'Backend', 'MobileDevelopment', 'Database', 'DataScience', 'MachineLearning', 'ArtificialIntelligence', 'DevOps', 'CloudComputing', 'Networking', 'Cybersecurity', 'Cryptography', 'GameDevelopment', 'ComputerGraphics', 'OperatingSystem', 'EmbeddedSystem', 'SystemDesign', 'Algorithms', 'ComputerScience', 'Others');

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;
