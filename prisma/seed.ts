import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';


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
  '/assets/dons.jpg',
  '/assets/benevolat.jpg',
  '/assets/histoire.jpg',
  '/assets/image1.jpg',
  '/assets/image2.jpg',
  '/assets/image3.jpg'
];

async function main() {
  const hashedPassword = await bcrypt.hash('admin1234', 10);
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'admin@nouvoulook.fr',
        password: hashedPassword,
        firstname: 'Admin',
        lastname: 'Nouvoulook',
        roles: ['admin']
      }
    });
  }

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
    { role: 'admin', resource: 'contact', action: 'read' },
    { role: 'admin', resource: 'contact', action: 'update' },
    { role: 'admin', resource: 'contact', action: 'delete' },
    { role: 'admin', resource: 'history', action: 'create' },
    { role: 'admin', resource: 'history', action: 'read' },
    { role: 'admin', resource: 'history', action: 'update' },
    { role: 'admin', resource: 'history', action: 'delete' },
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
    { role: 'user', resource: 'contact', action: 'read' },
  ];

  for (const permission of [...adminPermissions, ...userPermissions]) {
    await prisma.permissions.create({
      data: permission,
    });
  }

  // Seed des collectes (exemples de vêtements)
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
  await prisma.textVolunteer.deleteMany();
  await prisma.textVolunteer.create({
    data: {
      imageUrl: '/assets/benevolat.jpg',
      textContent: `<p class="p-4 rounded shadow-sm" style="background-color: #fce9f1; color: #111827; border-left: 6px solid #d946ef;">
  <i class="bi bi-people-fill me-2 text-danger"></i>
  Devenir bénévole chez <strong class="text-danger">Nouvoulook</strong>, c'est s'engager pour une <span class="fw-bold text-danger">consommation plus responsable</span> et une <span class="fw-bold text-danger">ville plus solidaire</span>. En rejoignant notre équipe, vous contribuez à <strong class="text-danger">revaloriser des dons</strong> (vêtements, meubles, jouets…) tout en créant du lien social dans une ambiance <strong class="text-danger">chaleureuse et inclusive</strong>. Que ce soit pour partager vos compétences, apprendre de nouvelles choses, ou simplement donner un peu de votre temps, chaque geste compte et a un véritable impact. Ensemble, faisons vivre un projet local, écologique et humain. <i class="text-danger ms-1"></i>
</p>
`,
      userId: user.id
    }
  });

  // Seed du contact info
  await prisma.contactInfo.deleteMany();
  await prisma.contactInfo.create({
    data: {
      smtpUser: 'A_COMPLETER_ICI',
      smtpPass: 'A_COMPLETER_ICI',
      publicEmail: 'nouvoulook@outlook.fr',
      phone: '03 28 07 66 52',
      address: '65 Bd Clemenceau, 59700 Marcq-en-Barœul',
      openingHours: 'Mardi au samedi : 14h - 18h\nFermé dimanche et lundi'
    }
  });
  await prisma.news.deleteMany();
  await prisma.news.create({
    data: {
      title: 'Nous cherchons des bénévoles',
      textContent: "🧺 1. Tri et valorisation des dons<br><br>Les bénévoles réceptionnent les vêtements, jouets, meubles et objets de décoration donnés par les particuliers ou les entreprises. Ils trient, nettoient et reconditionnent ces articles pour leur offrir une seconde vie, contribuant ainsi à une consommation plus responsable.<br><br>🛍️ 2. Accueil et conseil en boutique<br><br>En boutique, les bénévoles assurent l'accueil des clients, les conseillent et veillent à maintenir une ambiance chaleureuse et inclusive. Ils participent également à la mise en rayon et à l'encaissement, favorisant ainsi la mixité sociale et l'inclusion des personnes en difficulté.<br><br>✂️ 3. Animation d'ateliers de relooking et de customisation<br><br>Les bénévoles peuvent animer ou co-animer des ateliers mensuels de relooking et de customisation de vêtements, ouverts à tous. Ces ateliers permettent de partager des compétences en couture et en stylisme, tout en favorisant la créativité et le lien social.<br><br>📦 4. Logistique et gestion des stocks<br><br>En coulisses, les bénévoles participent à la gestion des stocks : réception des dons, tri, stockage et organisation des articles. Ils veillent à ce que les produits soient bien présentés en boutique et prêts à être vendus à des tarifs adaptés aux ressources des acheteurs. ",
      imageUrl: '/assets/benevolat.jpg'
    }
  });

await prisma.history.deleteMany();
await prisma.history.createMany({
  data: [
    {
      image1: '/assets/image1.jpg',
      image2: '/assets/image2.jpg',
      image3: '/assets/image3.jpg',
      imageUrl: '/assets/histoire.jpg',
      textContent: `En 2005, l'association Innovation & Développement lance le chantier d'insertion "Système D comme Déco" dans le quartier de la Briqueterie à Marcq-en-Barœul. Dix femmes y participent pour apprendre à rénover des meubles et aménager leur intérieur. Au-delà de l'aspect créatif, ce projet permet à certaines participantes de retrouver un emploi ou de s'engager dans une formation qualifiante. Cette initiative marque le début d'un projet plus ambitieux, impulsé par la ville de Marcq-en-Barœul : créer un lieu de vente solidaire pour prolonger la dynamique d'insertion et de lien social.`,
      textContent2: `Le 7 avril 2009, la boutique solidaire Nouvoulook ouvre ses portes. Pensée comme un espace de partage et de rencontres, elle propose vêtements, services et produits accessibles aux plus démunis comme au grand public. Porteuse des valeurs d'inclusion et d'économie circulaire, Nouvoulook devient un pont entre les mondes : elle crée du lien entre les habitants, valorise les parcours d'insertion et redonne une seconde vie aux objets comme aux personnes.`,
      textContent3: `En 2017, Nouvoulook rejoint le projet VISES, une initiative transfrontalière qui réunit 21 partenaires en France et en Belgique. L'objectif : évaluer l'impact social des entreprises solidaires. Pour l'équipe de Nouvoulook, cette démarche est naturelle. Évaluer, c'est progresser, ajuster et renforcer ce qui fonctionne. C'est aussi mettre en lumière le rôle essentiel de l'économie sociale dans la transformation positive des territoires.`,
    }
  ]
});

await prisma.timelineItem.deleteMany();
await prisma.timelineItem.createMany({
  data: [
    { year: '2005', description: "Lancement d'un projet de boutique solidaire" },
    { year: '2009', description: "Création de la boutique Nouvoulook" },
    { year: '2011', description: "La boutique développe d'autres activités" },
    { year: '2017', description: "Dépôt de dossier en tant qu'entreprise testeuse auprès de partenaires européens" },
  ]
});
 
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 