/*
  Warnings:

  - Added the required column `user_id` to the `Payable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payable" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Payable" ADD CONSTRAINT "Payable_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
