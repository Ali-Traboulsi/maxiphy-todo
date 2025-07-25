import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        firstName: 'Alice',
        lastName: 'Traboulsi',
        email: 'alice@example.com',
        password: 'hashedpassword1', // Use a hashed password in production
        isActive: true,
        isAdmin: true,
        avatarUrl: undefined,
        bio: 'Admin user',
        birthday: new Date('1990-01-01'),
      },
      {
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob@example.com',
        password: 'hashedpassword2',
        isActive: true,
        isAdmin: false,
        avatarUrl: undefined,
        bio: 'Regular user',
        birthday: new Date('1995-05-15'),
      },
      {
        firstName: 'Charlie',
        lastName: 'Doe',
        email: 'charlie@example.com',
        password: 'hashedpassword3',
        isActive: false,
        isAdmin: false,
        avatarUrl: undefined,
        bio: 'Inactive user',
        birthday: new Date('1988-12-20'),
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log('✅ Users seeded');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
