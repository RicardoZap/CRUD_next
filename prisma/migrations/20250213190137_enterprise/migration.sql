-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cellphone" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Enterprise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cellphone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Enterprise_pkey" PRIMARY KEY ("id")
);
