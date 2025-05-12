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
  '/assets/pictos/picto-vetements.svg',
  '/assets/dons.jpg'
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

  // Seed des collectes (exemples de vêtements)
  const user = await prisma.user.findFirst();
  if (!user) {
    throw new Error('Aucun utilisateur trouvé pour associer les collectes');
  }

  const clothingExamples = [
    {
      name: 'Accessoires',
      description: 'Accessoires en bon état (ceintures, chapeaux, etc.)',
      imageUrl: '/assets/pictos/picto-accessoires.svg',
      accepted: true,
      userId: user.id,
    },
    {
      name: 'Gros électroménager',
      description: 'Gros électroménager.',
      imageUrl: '/assets/pictos/picto-bigelectro.svg',
      accepted: false,
      userId: user.id,
    },
    {
      name: 'Objets cassés',
      description: 'Objets cassés ou irréparables non acceptés.',
      imageUrl: '/assets/pictos/picto-casse.svg',
      accepted: false,
      userId: user.id,
    },
    {
      name: 'Décoration',
      description: 'Objets de décoration en bon état.',
      imageUrl: '/assets/pictos/picto-deco.svg',
      accepted: true,
      userId: user.id,
    },
    {
      name: 'Petit électroménager',
      description: 'Petit électroménager fonctionnel.',
      imageUrl: '/assets/pictos/picto-electro.svg',
      accepted: true,
      userId: user.id,
    },
    {
      name: 'Informatique',
      description: 'Matériel informatique, HIFI, TV, cassettes vidéos et audios.',
      imageUrl: '/assets/pictos/picto-informatique.svg',
      accepted: false,
      userId: user.id,
    },
    {
      name: 'Jeux et jouets incomplets',
      description: 'Jeux et jouets incomplets.',
      imageUrl: '/assets/pictos/picto-jeux-casse.svg',
      accepted: false,
      userId: user.id,
    },
    {
      name: 'Jeux',
      description: 'Jeux et jouetscomplets et en bon état.',
      imageUrl: '/assets/pictos/picto-jeux.svg',
      accepted: true,
      userId: user.id,
    },
    {
      name: 'Linge',
      description: 'Linge de maison (lit, bain, table,...)',
      imageUrl: '/assets/pictos/picto-linge.svg',
      accepted: true,
      userId: user.id,
    },
    {
      name: 'Livres',
      description: 'Livres adultes.',
      imageUrl: '/assets/pictos/picto-livre.svg',
      accepted: false,
      userId: user.id,
    },
    {
      name: 'Mobilier',
      description: 'Petit mobilier en bon état, facile à transporter.',
      imageUrl: '/assets/pictos/picto-mobilier.svg',
      accepted: true,
      userId: user.id,
    },
    {
      name: 'Sécurité',
      description: 'tout ce qui est lié à la réglementation de la sécurité (siège auto, cozy...).',
      imageUrl: '/assets/pictos/picto-securite.svg',
      accepted: false,
      userId: user.id,
    },
    {
      name: 'Sport',
      description: "les équipements sportifs (rameurs, vélos d'appartement...).",
      imageUrl: '/assets/pictos/picto-sport.svg',
      accepted: false,
      userId: user.id,
    },
    {
      name: 'Tâché',
      description: 'Vêtements ou objets tâchés non acceptés.',
      imageUrl: '/assets/pictos/picto-tache.svg',
      accepted: false,
      userId: user.id,
    },
    {
      name: 'Vêtements',
      description: 'Vêtements propres, en bon état, sans trou.',
      imageUrl: '/assets/pictos/picto-vetements.svg',
      accepted: true,
      userId: user.id,
    },
  ];

  // Supprimer les collectes existantes
  await prisma.clothingExample.deleteMany();

  await prisma.clothingExample.createMany({
    data: clothingExamples
  });

  // Seed du message d'accueil et de la publicité dons
  await prisma.textDonation.deleteMany();
  await prisma.textDonation.create({
    data: {
      messageSchedule: "Nouvoulook vous accueille du mardi au vendredi matin de 9h à 12h ! Ainsi que le samedi après midi de 14h à 17h.\nFermé les dimanches et les lundis.",
      messageAdvertising: "Nous vous remercions chaleureusement pour votre <span class='dons-highlight'>générosité</span>.<br>Chaque don compte et contribue à aider ceux qui en ont <span class='dons-highlight'>besoin</span>.<br>Cependant, nous vous rappelons que nous ne sommes pas une <span class='dons-highlight'>décharge</span>.<br>Merci de ne donner que des vêtements <span class='dons-highlight'>propres</span>, en <span class='dons-highlight'>bon état</span>, et dignes d'être portés.<br> Nous nous réservons la possibilité de refuser ce qui est abîmé, incomplet, tâché, déchiré.<br>Car nous ne pouvons ni laver, ni réparer.",
      imageUrl: '/assets/dons.jpg',
      userId: user.id
    }
  });

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