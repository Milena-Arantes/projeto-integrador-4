/*
  Warnings:

  - You are about to drop the column `dose` on the `Lembrete` table. All the data in the column will be lost.
  - Added the required column `doseUnidade` to the `Lembrete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doseValor` to the `Lembrete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usoContinuo` to the `Lembrete` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lembrete" DROP COLUMN "dose",
ADD COLUMN     "doseUnidade" TEXT NOT NULL,
ADD COLUMN     "doseValor" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "intervalo" DOUBLE PRECISION,
ADD COLUMN     "quantidade" INTEGER,
ADD COLUMN     "usoContinuo" BOOLEAN NOT NULL,
ADD COLUMN     "usoInicio" TIMESTAMP(3),
ALTER COLUMN "dias" DROP NOT NULL,
ALTER COLUMN "horario" DROP NOT NULL;
