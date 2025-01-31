-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ap_paterno" TEXT NOT NULL,
    "ap_materno" TEXT NOT NULL,
    "birthday_date" TIMESTAMP(3) NOT NULL,
    "cellphone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
