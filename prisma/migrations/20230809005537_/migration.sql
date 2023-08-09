/*
  Warnings:

  - Added the required column `user_card_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "user_card_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User_card" (
    "id" SERIAL NOT NULL,
    "card_name" TEXT NOT NULL,
    "card_number" TEXT NOT NULL,
    "card_expiring_date" TIMESTAMP(3) NOT NULL,
    "card_cvv" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "User_card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_card_id_key" ON "User_card"("id");

-- AddForeignKey
ALTER TABLE "User_card" ADD CONSTRAINT "User_card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_card_id_fkey" FOREIGN KEY ("user_card_id") REFERENCES "User_card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
