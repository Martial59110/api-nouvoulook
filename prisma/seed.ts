import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Suppression des permissions existantes
  await prisma.permissions.deleteMany();

  // Permissions pour le rôle admin
  const adminPermissions = [
    { role: 'admin', resource: 'users', action: 'create' },
    { role: 'admin', resource: 'users', action: 'read' },
    { role: 'admin', resource: 'users', action: 'update' },
    { role: 'admin', resource: 'users', action: 'delete' },
    { role: 'admin', resource: 'news', action: 'create' },
    { role: 'admin', resource: 'news', action: 'read' },
    { role: 'admin', resource: 'news', action: 'update' },
    { role: 'admin', resource: 'news', action: 'delete' },
    { role: 'admin', resource: 'partners', action: 'create' },
    { role: 'admin', resource: 'partners', action: 'read' },
    { role: 'admin', resource: 'partners', action: 'update' },
    { role: 'admin', resource: 'partners', action: 'delete' },
    { role: 'admin', resource: 'text-donations', action: 'create' },
    { role: 'admin', resource: 'text-donations', action: 'read' },
    { role: 'admin', resource: 'text-donations', action: 'update' },
    { role: 'admin', resource: 'text-donations', action: 'delete' },
    { role: 'admin', resource: 'text-volunteers', action: 'create' },
    { role: 'admin', resource: 'text-volunteers', action: 'read' },
    { role: 'admin', resource: 'text-volunteers', action: 'update' },
    { role: 'admin', resource: 'text-volunteers', action: 'delete' },
    { role: 'admin', resource: 'clothing-examples', action: 'create' },
    { role: 'admin', resource: 'clothing-examples', action: 'read' },
    { role: 'admin', resource: 'clothing-examples', action: 'update' },
    { role: 'admin', resource: 'clothing-examples', action: 'delete' },
    { role: 'admin', resource: 'permissions', action: 'create' },
    { role: 'admin', resource: 'permissions', action: 'read' },
    { role: 'admin', resource: 'permissions', action: 'update' },
    { role: 'admin', resource: 'permissions', action: 'delete' },
  ];

  // Permissions pour le rôle user
  const userPermissions = [
    { role: 'user', resource: 'news', action: 'read' },
    { role: 'user', resource: 'partners', action: 'read' },
    { role: 'user', resource: 'text-donations', action: 'create' },
    { role: 'user', resource: 'text-donations', action: 'read' },
    { role: 'user', resource: 'text-volunteers', action: 'create' },
    { role: 'user', resource: 'text-volunteers', action: 'read' },
    { role: 'user', resource: 'clothing-examples', action: 'create' },
    { role: 'user', resource: 'clothing-examples', action: 'read' },
  ];

  // Création des permissions
  for (const permission of [...adminPermissions, ...userPermissions]) {
    await prisma.permissions.create({
      data: permission,
    });
  }

  console.log('Permissions créées avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 