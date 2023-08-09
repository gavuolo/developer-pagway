/*
  Warnings:

  - Changed the type of `rate` on the `Payable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `net_value` on the `Payable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Payable" DROP COLUMN "rate",
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL,
DROP COLUMN "net_value",
ADD COLUMN     "net_value" INTEGER NOT NULL;
