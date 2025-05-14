/*
  Warnings:

  - Added the required column `bbIndex` to the `Hand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sbIndex` to the `Hand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hand" ADD COLUMN     "bbIndex" INTEGER NOT NULL,
ADD COLUMN     "sbIndex" INTEGER NOT NULL;
