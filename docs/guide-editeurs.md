# Guide de formation — Éditeurs DRAGMOB Production

> Ce guide est destiné aux membres de l'association chargés de publier des articles sur le site. Aucune compétence technique n'est requise.

---

## Sommaire

1. [Accès au site et à l'espace admin](#1-accès)
2. [Créer un article](#2-créer-un-article)
3. [Modifier ou dépublier un article](#3-modifier-ou-dépublier-un-article)
4. [Les catégories disponibles](#4-les-catégories)
5. [Conseils de rédaction](#5-conseils-de-rédaction)
6. [Contact support](#6-contact-support)

---

## 1. Accès

### Site public

Le site DRAGMOB Production est accessible à l'adresse :

```
https://dragmob-production.vercel.app
```

Le blog public est visible par tous les visiteurs à `/blog`.

### Espace d'administration

L'interface de gestion des articles se trouve à :

```
https://dragmob-production.vercel.app/admin/login
```

### Obtenir un compte

Les comptes éditeurs sont créés par l'administrateur du site. Pour en demander un :

1. Contactez le responsable technique (voir section [Contact support](#6-contact-support)).
2. Communiquez votre adresse e-mail.
3. Vous recevrez un e-mail de Supabase avec un lien pour définir votre mot de passe.

> **Important :** Ne partagez jamais vos identifiants avec une autre personne.

### Se connecter

1. Rendez-vous sur `/admin/login`.
2. Saisissez votre adresse e-mail et votre mot de passe.
3. Cliquez sur **Se connecter**.

Vous arrivez sur le **tableau de bord** qui liste tous les articles.

---

## 2. Créer un article

### Étape 1 — Ouvrir l'éditeur

Depuis le tableau de bord, cliquez sur le bouton **`+ Nouvel article`** en haut à droite.

### Étape 2 — Rédiger le contenu

#### Titre *(obligatoire)*

Saisissez le titre de l'article dans le champ **Titre**. Le titre s'affiche en haut de la page de l'article et dans la liste du blog.

> Le **slug** (adresse URL de l'article) est généré automatiquement à partir du titre. Vous pouvez le modifier manuellement si nécessaire — il doit être unique et sans espaces ni caractères spéciaux.

#### Contenu *(obligatoire)*

Rédigez le corps de l'article dans la grande zone de texte **Contenu**.

Le contenu supporte la syntaxe **Markdown** pour la mise en forme :

| Effet | Syntaxe |
|---|---|
| **Gras** | `**texte**` |
| *Italique* | `*texte*` |
| Titre de section | `## Mon titre` |
| Sous-titre | `### Mon sous-titre` |
| Liste à puces | `- élément` |
| Liste numérotée | `1. élément` |
| Lien | `[texte du lien](https://url.com)` |
| Citation | `> citation` |

**Exemple de structure d'article :**

```markdown
## Introduction

Courte accroche qui donne envie de lire la suite.

## Corps de l'article

Développez votre sujet en paragraphes. Utilisez des titres de section
pour organiser l'information.

## Conclusion

Un résumé ou un appel à l'action.
```

### Étape 3 — Renseigner les métadonnées (colonne de droite)

#### Slug

Vérifiez que le slug est lisible et pertinent. Il forme l'URL finale : `/blog/mon-slug`.

#### Date

La date de publication est pré-remplie avec aujourd'hui. Vous pouvez la modifier pour antidater ou postdater un article.

#### Catégorie

Sélectionnez la catégorie la plus appropriée dans le menu déroulant. Voir la section [Les catégories](#4-les-catégories) pour une description de chacune.

#### Image de couverture

1. Cliquez sur **📎 Choisir une image**.
2. Sélectionnez un fichier image sur votre ordinateur (JPG, PNG, WebP ou GIF).
3. L'image est uploadée automatiquement et une prévisualisation apparaît.
4. Pour changer d'image, cliquez à nouveau sur **📎 Choisir une image**.
5. Pour supprimer l'image, cliquez sur **Supprimer l'image**.

> Voir la section [Conseils de rédaction](#5-conseils-de-rédaction) pour les dimensions recommandées.

#### Extrait

L'extrait est un court résumé (2 à 3 phrases) affiché dans la liste des articles. S'il est vide, les premiers mots du contenu sont utilisés.

### Étape 4 — Publier ou enregistrer en brouillon

En haut à droite de l'éditeur se trouve un interrupteur **Brouillon / Publié** :

- **Brouillon** : l'article est enregistré mais invisible sur le site public. Utile pour préparer un article à l'avance.
- **Publié** : l'article est visible par tous les visiteurs.

Cliquez sur **Enregistrer** pour sauvegarder l'article dans l'état choisi.

> Vous revenez automatiquement au tableau de bord après l'enregistrement.

---

## 3. Modifier ou dépublier un article

### Modifier un article existant

1. Depuis le tableau de bord, repérez l'article dans la liste.
2. Cliquez sur le bouton **Modifier** à droite de la ligne.
3. Effectuez vos changements dans l'éditeur.
4. Cliquez sur **Enregistrer**.

### Passer un article en brouillon (dépublier)

**Méthode rapide depuis le tableau de bord :**

1. Repérez l'article dont le statut affiche **Publié** (bouton vert).
2. Cliquez sur ce bouton : il passe instantanément à **Brouillon** (gris) et l'article disparaît du site public.

**Méthode via l'éditeur :**

1. Ouvrez l'article avec **Modifier**.
2. Décochez l'interrupteur **Publié** en haut à droite pour le repasser à **Brouillon**.
3. Cliquez sur **Enregistrer**.

### Supprimer un article définitivement

> ⚠️ **Attention :** La suppression est irréversible.

1. Dans le tableau de bord, cliquez sur **Supprimer** à droite de l'article.
2. Une fenêtre de confirmation s'affiche : cliquez sur **OK** pour confirmer.

---

## 4. Les catégories

Le blog propose quatre catégories pour organiser les articles :

### Actualités

Informations sur la vie de l'association : nouveaux projets, évolutions, communiqués de presse, annonces importantes.

*Exemples : "Nouveau partenariat avec X", "Résultats de notre dernier événement", "DRAGMOB recrute des bénévoles"*

### Événements

Annonces et comptes rendus d'événements organisés ou co-organisés par DRAGMOB Production : projections, festivals, ateliers, rencontres.

*Exemples : "Festival de court-métrages le 15 juillet", "Atelier réalisation — inscription ouverte", "Retour sur la soirée du 3 juin"*

### Tutoriels

Contenus pédagogiques à destination des membres et du grand public : guides pratiques, conseils techniques, ressources de formation.

*Exemples : "Comment cadrer un plan séquence", "Introduction au montage avec DaVinci Resolve", "Choisir son micro pour le tournage"*

### Photos & Vidéos

Galeries, témoignages visuels, extraits de productions, making-of, archives photographiques.

*Exemples : "Galerie photos — tournage du court-métrage X", "Making-of : coulisses du festival", "Les meilleures images de 2024"*

---

## 5. Conseils de rédaction

### Image de couverture

| Paramètre | Recommandation |
|---|---|
| **Format** | JPG ou WebP (meilleure compression) |
| **Dimensions** | 1200 × 630 px minimum |
| **Ratio** | 16:9 recommandé |
| **Poids** | Moins de 1 Mo (idéalement < 500 Ko) |
| **Contenu** | Évitez les images avec beaucoup de texte |

> **Astuce :** Si vous avez une image trop lourde, utilisez [Squoosh](https://squoosh.app) (gratuit, en ligne) pour la compresser avant l'upload.

### Titre

- Court et percutant : **50 à 70 caractères** maximum.
- Évitez les majuscules abusives.
- Posez une question ou utilisez un chiffre pour attirer l'attention : *"5 conseils pour réussir votre court-métrage"*.

### Extrait

- **2 à 3 phrases**, 150 à 200 caractères maximum.
- Résumez l'essentiel sans tout dévoiler.
- Écrivez à la troisième personne ou de façon impersonnelle.

### Contenu

- Structurez avec des titres (`##`) pour faciliter la lecture.
- Préférez des paragraphes courts (3 à 5 lignes).
- Relisez avant de publier : vérifiez l'orthographe et la ponctuation.
- Évitez de coller du texte depuis Word directement — préférez Bloc-notes ou un éditeur de texte simple pour éviter les caractères parasites.

### Bonnes pratiques générales

- Publiez régulièrement pour maintenir l'intérêt des lecteurs.
- Un article par semaine suffit pour animer le blog.
- Associez toujours une image de couverture : les articles sans image sont moins cliqués.
- Passez en **Brouillon** plutôt que de supprimer si vous n'êtes pas sûr de vouloir retirer définitivement un contenu.

---

## 6. Contact support

En cas de problème technique (impossible de se connecter, erreur lors de l'enregistrement, article qui n'apparaît pas, etc.), contactez le développeur du site :

**Maxime Bergerard**
📧 maxime.bergerard@gmail.com

Merci d'indiquer dans votre message :
- La nature du problème rencontré
- L'article concerné (titre ou URL)
- Un éventuel message d'erreur affiché à l'écran

---

*Guide rédigé par DWA — Disruptive Web Agency · Juin 2026*
