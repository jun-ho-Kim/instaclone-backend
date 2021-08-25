/*
  Warnings:

  - You are about to drop the column `paylod` on the `Message` table. All the data in the column will be lost.
  - Added the required column `payload` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "paylod",
ADD COLUMN     "payload" TEXT NOT NULL;
