/*
  Warnings:

  - You are about to drop the column `card_cvv` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `card_expiring_date` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `card_name` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `card_number` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "card_cvv",
DROP COLUMN "card_expiring_date",
DROP COLUMN "card_name",
DROP COLUMN "card_number";
