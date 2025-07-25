import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

const priorities = ['LOW', 'MEDIUM', 'HIGH'] as const;

function randomPriority() {
  return priorities[Math.floor(Math.random() * priorities.length)];
}

function randomBool() {
  return Math.random() < 0.5;
}

function randomDate() {
  const start = new Date(2023, 0, 1).getTime();
  const end = new Date().getTime();
  return new Date(start + Math.random() * (end - start));
}

function randomDescription(i: number) {
  const actions = [
    'Write code',
    'Review PR',
    'Fix bug',
    'Update docs',
    'Test feature',
    'Deploy app',
    'Design UI',
    'Refactor module',
    'Sync with team',
    'Plan sprint',
  ];
  return `${actions[Math.floor(Math.random() * actions.length)]} #${i}`;
}

async function main() {
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    throw new Error('No users found. Seed users first.');
  }

  const todos: {
    description: string;
    priority: (typeof priorities)[number];
    date: Date;
    completed: boolean;
    pinned: boolean;
    userId: string;
  }[] = [];
  for (let i = 1; i <= 100; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    todos.push({
      description: randomDescription(i),
      priority: randomPriority(),
      date: randomDate(),
      completed: randomBool(),
      pinned: randomBool(),
      userId: user.id,
    });
  }

  await prisma.todo.createMany({
    data: todos,
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log('✅ Lots of todos seeded');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
