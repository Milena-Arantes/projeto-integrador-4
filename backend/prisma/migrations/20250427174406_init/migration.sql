-- CreateTable
CREATE TABLE "Lembrete" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "notificacao" BOOLEAN NOT NULL,
    "telefone" TEXT,
    "email" TEXT,
    "medicamento" TEXT NOT NULL,
    "dose" TEXT NOT NULL,
    "dias" INTEGER NOT NULL,
    "horario" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lembrete_pkey" PRIMARY KEY ("id")
);
