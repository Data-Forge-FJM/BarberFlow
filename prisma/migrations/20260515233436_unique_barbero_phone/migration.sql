/*
  Warnings:

  - A unique constraint covering the columns `[telefono]` on the table `Barbero` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Barbero_telefono_key" ON "Barbero"("telefono");
