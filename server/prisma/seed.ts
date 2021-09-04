import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const bob = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.io',
      picture: '',
      tasks: {
        create: [
          { task: 'Test API' },
          { task: 'Science homework' },
          { task: 'Have fun' },
        ],
      },
    },
  });

  console.log({ bob });
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
