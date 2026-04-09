export type Category = 'actualites' | 'evenements' | 'tutoriels' | 'photos-videos';

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: Category;
  categoryLabel: string;
  excerpt: string;
  coverImage: string;
  content: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  'actualites': 'Actualités',
  'evenements': 'Événements',
  'tutoriels': 'Tutoriels',
  'photos-videos': 'Photos & Vidéos',
};

export const posts: Post[] = [
  {
    slug: 'dragmob-au-circuit-de-vendee-2025',
    title: `DRAGMOB au Circuit de Vendée — retour sur une journée de feu`,
    date: '2026-03-28',
    category: 'evenements',
    categoryLabel: 'Événements',
    excerpt: `Une journée inoubliable sur le bitume vendéen. Nos pilotes ont tout donné, les chronos sont tombés et la fumée des burnouts a parfumé l'air toute la journée.`,
    coverImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
    content: `
Une journée inoubliable sur le bitume vendéen. Nos pilotes ont tout donné, les chronos sont tombés et la fumée des burnouts a parfumé l'air toute la journée.

## Le départ

Dès 7h du matin, les camions et remorques commençaient à envahir le paddock du Circuit de Vendée. L'ambiance était électrique — tout le monde attendait ce rassemblement depuis des mois.

## Les courses

La piste était parfaitement préparée. Le track-prep team avait fait un travail remarquable, et ça s'est vu sur les temps : plusieurs records personnels ont été battus !

**Classement du jour :**
- Marc D. — 9.87s au quart de mile
- Sophie R. — 10.12s
- Thierry M. — 10.45s

## L'ambiance

Plus de 200 spectateurs ont fait le déplacement. Les enfants en avaient plein les yeux, les passionnés débriefaient dans le paddock, et les grillades du soir ont prolongé la fête jusqu'à la nuit tombée.

Rendez-vous l'année prochaine — encore plus fort !
    `.trim(),
  },
  {
    slug: 'comment-preparer-son-dragster-pour-la-saison',
    title: `Comment préparer son dragster pour la saison : guide complet`,
    date: '2026-03-10',
    category: 'tutoriels',
    categoryLabel: 'Tutoriels',
    excerpt: `La saison approche et ton moteur ronronne dans le garage ? Voici notre checklist complète pour arriver au départ dans les meilleures conditions.`,
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    content: `
La saison approche et ton moteur ronronne dans le garage ? Voici notre checklist complète pour arriver au départ dans les meilleures conditions.

## 1. La mécanique de base

Avant toute chose, on s'occupe de la base :

- Vidange moteur : huile fraîche, filtre neuf.
- Bougies : vérifier l'écartement, changer si nécessaire.
- Courroie de distribution : si tu approches les 60 000 km, ne prends pas de risque.

## 2. Le système de freinage

Un dragster qui accélère fort doit aussi freiner fort. Plaquettes, disques, niveaux de liquide — tout doit être impeccable.

## 3. Les pneus

Les slicks ou les drag radials, c'est le lien entre ton bolide et la piste. Vérifie l'usure, la pression, et la date de fabrication. Un pneu vieilli peut exploser au départ.

## 4. La sécurité

Cage de sécurité, harnais, extincteur — rien n'est optionnel en compétition. La FIA France a ses exigences, respecte-les.

## 5. Le setup

Réglages de suspension, wheelie bars, poids... Chaque gram compte. Travaille avec ton équipe et note tout dans ton logbook.

Bonne préparation et bons temps !
    `.trim(),
  },
  {
    slug: 'nouveaux-membres-hiver-2026',
    title: `Bienvenue à nos nouveaux membres hiver 2026`,
    date: '2026-02-15',
    category: 'actualites',
    categoryLabel: 'Actualités',
    excerpt: `DRAGMOB Production accueille 12 nouveaux membres pour la saison 2026. Voici une présentation rapide de ces passionnés qui rejoignent notre grande famille.`,
    coverImage: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80',
    content: `
DRAGMOB Production accueille 12 nouveaux membres pour la saison 2026 ! C'est avec un immense plaisir que nous présentons ces passionnés qui rejoignent notre grande famille.

## Qui sont-ils ?

De tous horizons et de tous âges, nos nouveaux membres partagent une même passion : le dragster. Certains viennent du circuit classique, d'autres découvrent la discipline pour la première fois.

Parmi eux :
- Julien, 23 ans — passionné de mécaniques américaines depuis le lycée
- Nathalie, 41 ans — venue au drag après des années de karting
- Le clan Morin — père et fils, ils partagent la même voiture et les mêmes rêves

## Les prochains rendez-vous

Pour les accueillir comme il se doit, nous organisons une journée découverte au début du mois de mars. Roulage libre, débriefing technique, et bien sûr le traditionnel barbecue de l'asso.

Bienvenue à tous !
    `.trim(),
  },
  {
    slug: 'photos-rassemblement-americain-2026',
    title: `Photos — Rassemblement américain de Bordeaux 2026`,
    date: '2026-01-20',
    category: 'photos-videos',
    categoryLabel: 'Photos & Vidéos',
    excerpt: `DRAGMOB était présent au rassemblement américain de Bordeaux. Voici un album photo de cette journée mémorable entre customs, hot rods et dragsters.`,
    coverImage: 'https://images.unsplash.com/photo-1607853202273-232359b8c6b5?w=800&q=80',
    content: `
DRAGMOB était présent au rassemblement américain de Bordeaux, et quelle journée ! Customs chromées, hot rods rugissants, dragsters prêts à décoller — le tout sous un soleil de janvier insolent.

## L'album

Voici une sélection de nos meilleures photos de la journée. Un grand merci à notre photographe officieux, Pascal, pour ces superbes clichés.

### Favorites

- La Chevrolet Camaro 1969 de Michel — un monstre de 650 chevaux
- La drag bike de Stéphane — 0 à 100 en moins d'une seconde
- Le burnout collectif en fin de journée — la fumée visible depuis l'autoroute

## Vidéo résumé

La vidéo résumé de la journée est disponible sur notre page Facebook. Likez, partagez, et à l'année prochaine !
    `.trim(),
  },
  {
    slug: 'reglement-dragster-france-2026-ce-qui-change',
    title: `Règlement dragster France 2026 : ce qui change`,
    date: '2025-12-10',
    category: 'actualites',
    categoryLabel: 'Actualités',
    excerpt: `La fédération a publié les nouvelles règles pour la saison 2026. Entre nouvelles catégories, homologations et exigences de sécurité renforcées, voici ce qu'il faut retenir.`,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    content: `
La Fédération Française du Sport Automobile a publié ses nouvelles directives pour la saison 2026. Voici ce que tout pilote et équipe doit savoir.

## Les nouvelles catégories

Une nouvelle catégorie "Vintage Drag" fait son apparition pour les véhicules produits avant 1985. Une excellente nouvelle pour les amateurs de classiques !

## Sécurité renforcée

- Les harnais de plus de 5 ans ne seront plus acceptés en compétition
- La cage de sécurité doit désormais être homologuée par un organisme agréé
- Un extincteur homologué FIA est obligatoire dans tous les véhicules

## Les homologations

Le délai de traitement des homologations techniques passe de 30 à 15 jours. Une bonne nouvelle pour les pilotes de dernière minute !

## Calendrier prévisionnel

Le calendrier complet sera publié en janvier. On attend déjà au moins 8 manches nationales et plusieurs rassemblements régionaux.

Restez connectés sur notre page Facebook pour toutes les mises à jour !
    `.trim(),
  },
  {
    slug: 'comment-filmer-son-quart-de-mile-comme-un-pro',
    title: `Comment filmer son quart de mile comme un pro`,
    date: '2025-11-05',
    category: 'tutoriels',
    categoryLabel: 'Tutoriels',
    excerpt: `GoPro, smartphone, ou caméra embarquée ? On vous donne tous nos conseils pour ramener des images épiques de vos passages sur la piste.`,
    coverImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80',
    content: `
Vous avez la bagnole, vous avez le talent — maintenant il vous faut les images pour le prouver ! Voici nos conseils pour filmer vos passages comme un vrai cinéaste de circuit.

## Le matériel

GoPro Hero 12 Black — la référence pour l'embarqué. Stabilisation excellent, image 4K, et résistante aux vibrations.

Smartphone avec gimbal — parfait pour filmer depuis le bord de piste. Un Osmo Mobile fait des miracles.

Drone — si le circuit l'autorise, les prises de vue aériennes sont spectaculaires.

## Les angles incontournables

- Vue pilote : fixée au casque ou au pare-brise, elle donne la sensation de vitesse
- Vue extérieure latérale : depuis le paddock, au niveau du sol, pour sentir la puissance
- Vue arrière départ : les roues qui patinent, le sol qui file — le classique

## Les réglages

- Fréquence : 60 ou 120 fps pour pouvoir ralentir en post-prod
- Exposition : légèrement sous-exposé pour éviter la surbrillance de la piste
- Stabilisation : toujours activée, même en embarqué

## Le montage

DaVinci Resolve (gratuit) fait tout ce dont vous avez besoin. Ajoutez de la musique rock ou metal, quelques effets de vitesse, et partagez sur Facebook !
    `.trim(),
  },
];
