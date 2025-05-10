import { PrismaClient } from '@prisma/client';


  const prisma = new PrismaClient();

const pictos = [
  '/assets/pictos/picto-accessoires.svg',
  '/assets/pictos/picto-bigelectro.svg',
  '/assets/pictos/picto-casse.svg',
  '/assets/pictos/picto-deco.svg',
  '/assets/pictos/picto-electro.svg',
  '/assets/pictos/picto-informatique.svg',
  '/assets/pictos/picto-jeux-casse.svg',
  '/assets/pictos/picto-jeux.svg',
  '/assets/pictos/picto-linge.svg',
  '/assets/pictos/picto-livre.svg',
  '/assets/pictos/picto-mobilier.svg',
  '/assets/pictos/picto-securite.svg',
  '/assets/pictos/picto-sport.svg',
  '/assets/pictos/picto-tache.svg',
  '/assets/pictos/picto-vetements.svg'
];

async function main() {
  // Seed des pictos
  for (const url of pictos) {
    await prisma.picto.upsert({
      where: { url },
      update: {},
      create: { url }
    });
  }

  // Seed des permissions
  await prisma.permissions.deleteMany();

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

  for (const permission of [...adminPermissions, ...userPermissions]) {
    await prisma.permissions.create({
      data: permission,
    });
  }

  console.log('Pictos et permissions créés avec succès !');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 