import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Crear usuarios aleatorios
  for (let i = 0; i < 20; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.firstName(),
        ap_paterno: faker.person.lastName(),
        ap_materno: faker.person.lastName(),
        birthday_date: faker.date.birthdate(),
        cellphone: faker.phone.number(),
        email: faker.internet.email(),
      },
    });
  }

  // Crear empresas aleatorias
  for (let i = 0; i < 20; i++) {
    await prisma.enterprise.create({
      data: {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        cellphone: faker.phone.number(),
        email: faker.internet.email(),
      },
    });
  }

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
