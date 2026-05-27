-- Articles table
create table if not exists articles (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  date date not null default current_date,
  category text not null check (category in ('actualites', 'evenements', 'tutoriels', 'photos-videos')),
  excerpt text not null default '',
  cover_image text not null default '',
  content text not null default '',
  published boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-update updated_at
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger articles_updated_at
  before update on articles
  for each row execute function set_updated_at();

-- Row Level Security
alter table articles enable row level security;

-- Public can read published articles
create policy "public_read_published" on articles
  for select using (published = true);

-- Authenticated users have full CRUD
create policy "auth_full_access" on articles
  for all using (auth.role() = 'authenticated');

-- Seed with existing static posts
insert into articles (slug, title, date, category, excerpt, cover_image, content, published) values
(
  'dragmob-au-circuit-de-vendee-2025',
  'DRAGMOB au Circuit de Vendée — retour sur une journée de feu',
  '2026-03-28',
  'evenements',
  'Une journée inoubliable sur le bitume vendéen. Nos pilotes ont tout donné, les chronos sont tombés et la fumée des burnouts a parfumé l''air toute la journée.',
  'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
  E'Une journée inoubliable sur le bitume vendéen. Nos pilotes ont tout donné, les chronos sont tombés et la fumée des burnouts a parfumé l''air toute la journée.\n\n## Le départ\n\nDès 7h du matin, les camions et remorques commençaient à envahir le paddock du Circuit de Vendée. L''ambiance était électrique — tout le monde attendait ce rassemblement depuis des mois.\n\n## Les courses\n\nLa piste était parfaitement préparée. Le track-prep team avait fait un travail remarquable, et ça s''est vu sur les temps : plusieurs records personnels ont été battus !\n\n**Classement du jour :**\n- Marc D. — 9.87s au quart de mile\n- Sophie R. — 10.12s\n- Thierry M. — 10.45s\n\n## L''ambiance\n\nPlus de 200 spectateurs ont fait le déplacement. Les enfants en avaient plein les yeux, les passionnés débriefaient dans le paddock, et les grillades du soir ont prolongé la fête jusqu''à la nuit tombée.\n\nRendez-vous l''année prochaine — encore plus fort !',
  true
),
(
  'comment-preparer-son-dragster-pour-la-saison',
  'Comment préparer son dragster pour la saison : guide complet',
  '2026-03-10',
  'tutoriels',
  'La saison approche et ton moteur ronronne dans le garage ? Voici notre checklist complète pour arriver au départ dans les meilleures conditions.',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  E'La saison approche et ton moteur ronronne dans le garage ? Voici notre checklist complète pour arriver au départ dans les meilleures conditions.\n\n## 1. La mécanique de base\n\n- Vidange moteur : huile fraîche, filtre neuf.\n- Bougies : vérifier l''écartement, changer si nécessaire.\n- Courroie de distribution : si tu approches les 60 000 km, ne prends pas de risque.\n\n## 2. Le système de freinage\n\nUn dragster qui accélère fort doit aussi freiner fort. Plaquettes, disques, niveaux de liquide — tout doit être impeccable.\n\n## 3. Les pneus\n\nLes slicks ou les drag radials, c''est le lien entre ton bolide et la piste. Vérifie l''usure, la pression, et la date de fabrication. Un pneu vieilli peut exploser au départ.\n\n## 4. La sécurité\n\nCage de sécurité, harnais, extincteur — rien n''est optionnel en compétition. La FIA France a ses exigences, respecte-les.\n\n## 5. Le setup\n\nRéglages de suspension, wheelie bars, poids... Chaque gram compte. Travaille avec ton équipe et note tout dans ton logbook.\n\nBonne préparation et bons temps !',
  true
),
(
  'nouveaux-membres-hiver-2026',
  'Bienvenue à nos nouveaux membres hiver 2026',
  '2026-02-15',
  'actualites',
  'DRAGMOB Production accueille 12 nouveaux membres pour la saison 2026. Voici une présentation rapide de ces passionnés qui rejoignent notre grande famille.',
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80',
  E'DRAGMOB Production accueille 12 nouveaux membres pour la saison 2026 ! C''est avec un immense plaisir que nous présentons ces passionnés qui rejoignent notre grande famille.\n\n## Qui sont-ils ?\n\nDe tous horizons et de tous âges, nos nouveaux membres partagent une même passion : le dragster. Certains viennent du circuit classique, d''autres découvrent la discipline pour la première fois.\n\nParmi eux :\n- Julien, 23 ans — passionné de mécaniques américaines depuis le lycée\n- Nathalie, 41 ans — venue au drag après des années de karting\n- Le clan Morin — père et fils, ils partagent la même voiture et les mêmes rêves\n\n## Les prochains rendez-vous\n\nPour les accueillir comme il se doit, nous organisons une journée découverte au début du mois de mars. Roulage libre, débriefing technique, et bien sûr le traditionnel barbecue de l''asso.\n\nBienvenue à tous !',
  true
),
(
  'photos-rassemblement-americain-2026',
  'Photos — Rassemblement américain de Bordeaux 2026',
  '2026-01-20',
  'photos-videos',
  'DRAGMOB était présent au rassemblement américain de Bordeaux. Voici un album photo de cette journée mémorable entre customs, hot rods et dragsters.',
  'https://images.unsplash.com/photo-1607853202273-232359b8c6b5?w=800&q=80',
  E'DRAGMOB était présent au rassemblement américain de Bordeaux, et quelle journée ! Customs chromées, hot rods rugissants, dragsters prêts à décoller — le tout sous un soleil de janvier insolent.\n\n## L''album\n\nVoici une sélection de nos meilleures photos de la journée. Un grand merci à notre photographe officieux, Pascal, pour ces superbes clichés.\n\n### Favorites\n\n- La Chevrolet Camaro 1969 de Michel — un monstre de 650 chevaux\n- La drag bike de Stéphane — 0 à 100 en moins d''une seconde\n- Le burnout collectif en fin de journée — la fumée visible depuis l''autoroute\n\n## Vidéo résumé\n\nLa vidéo résumé de la journée est disponible sur notre page Facebook. Likez, partagez, et à l''année prochaine !',
  true
),
(
  'reglement-dragster-france-2026-ce-qui-change',
  'Règlement dragster France 2026 : ce qui change',
  '2025-12-10',
  'actualites',
  'La fédération a publié les nouvelles règles pour la saison 2026. Entre nouvelles catégories, homologations et exigences de sécurité renforcées, voici ce qu''il faut retenir.',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
  E'La Fédération Française du Sport Automobile a publié ses nouvelles directives pour la saison 2026. Voici ce que tout pilote et équipe doit savoir.\n\n## Les nouvelles catégories\n\nUne nouvelle catégorie "Vintage Drag" fait son apparition pour les véhicules produits avant 1985. Une excellente nouvelle pour les amateurs de classiques !\n\n## Sécurité renforcée\n\n- Les harnais de plus de 5 ans ne seront plus acceptés en compétition\n- La cage de sécurité doit désormais être homologuée par un organisme agréé\n- Un extincteur homologué FIA est obligatoire dans tous les véhicules\n\n## Les homologations\n\nLe délai de traitement des homologations techniques passe de 30 à 15 jours. Une bonne nouvelle pour les pilotes de dernière minute !\n\n## Calendrier prévisionnel\n\nLe calendrier complet sera publié en janvier. On attend déjà au moins 8 manches nationales et plusieurs rassemblements régionaux.\n\nRestez connectés sur notre page Facebook pour toutes les mises à jour !',
  true
),
(
  'comment-filmer-son-quart-de-mile-comme-un-pro',
  'Comment filmer son quart de mile comme un pro',
  '2025-11-05',
  'tutoriels',
  'GoPro, smartphone, ou caméra embarquée ? On vous donne tous nos conseils pour ramener des images épiques de vos passages sur la piste.',
  'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80',
  E'Vous avez la bagnole, vous avez le talent — maintenant il vous faut les images pour le prouver ! Voici nos conseils pour filmer vos passages comme un vrai cinéaste de circuit.\n\n## Le matériel\n\nGoPro Hero 12 Black — la référence pour l''embarqué. Stabilisation excellent, image 4K, et résistante aux vibrations.\n\nSmartphone avec gimbal — parfait pour filmer depuis le bord de piste. Un Osmo Mobile fait des miracles.\n\nDrone — si le circuit l''autorise, les prises de vue aériennes sont spectaculaires.\n\n## Les angles incontournables\n\n- Vue pilote : fixée au casque ou au pare-brise, elle donne la sensation de vitesse\n- Vue extérieure latérale : depuis le paddock, au niveau du sol, pour sentir la puissance\n- Vue arrière départ : les roues qui patinent, le sol qui file — le classique\n\n## Les réglages\n\n- Fréquence : 60 ou 120 fps pour pouvoir ralentir en post-prod\n- Exposition : légèrement sous-exposé pour éviter la surbrillance de la piste\n- Stabilisation : toujours activée, même en embarqué\n\n## Le montage\n\nDaVinci Resolve (gratuit) fait tout ce dont vous avez besoin. Ajoutez de la musique rock ou metal, quelques effets de vitesse, et partagez sur Facebook !',
  true
);
