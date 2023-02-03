/*
  Warnings:

  - A unique constraint covering the columns `[confirmation_code]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_confirmation_code_key" ON "user"("confirmation_code");
