# Pages de détail des projets

Ce dossier contient les pages de détail pour chaque projet du portfolio.

## Structure

```
projects/
├── zetoupanda.html    # Page détail du projet ZetouPanda
├── shuno.html         # Page détail du projet Shu-no
└── portfolio.html     # Page détail du portfolio
```

## Captures d'écran

Les captures d'écran des projets doivent être placées dans les dossiers suivants :

```
images/projects/
├── zetoupanda/
│   ├── home.jpg (ou .png/.webp)
│   ├── catalog.jpg
│   ├── product.jpg
│   ├── cart.jpg
│   ├── admin.jpg
│   └── manage-products.jpg
│
├── shuno/
│   ├── home.jpg
│   ├── articles.jpg
│   ├── character.jpg
│   ├── editor.jpg
│   ├── search.jpg
│   └── admin.jpg
│
└── portfolio/
    ├── hero.jpg
    ├── about.jpg
    ├── skills.jpg
    ├── projects.jpg
    ├── contact.jpg
    └── mobile.jpg
```

## Format recommandé

- **Format** : WebP (meilleur ratio qualité/poids) ou JPG
- **Résolution** : 1920x1080 px (16:9) pour une qualité optimale
- **Poids** : < 200 Ko par image (optimisez avec TinyPNG ou similaire)
- **Nommage** : utilisez des noms descriptifs en minuscules sans espaces

## Comment mettre à jour les images

1. Ajoutez vos captures d'écran dans le dossier correspondant au projet
2. Ouvrez le fichier HTML du projet (ex: `zetoupanda.html`)
3. Remplacez les placeholders dans la section "Galerie de captures d'écran"

### Exemple pour ZetouPanda

Remplacez :

```html
<div class="bg-gray-200 rounded-xl aspect-video flex items-center justify-center">
  <div class="text-center">
    <i class="fas fa-image text-gray-400 text-4xl mb-2"></i>
    <p class="text-gray-500 text-sm">Page d'accueil</p>
  </div>
</div>
```

Par :

```html
<div class="rounded-xl aspect-video overflow-hidden shadow-md hover:shadow-xl transition-shadow">
  <img
    src="../images/projects/zetoupanda/home.jpg"
    alt="Page d'accueil de ZetouPanda"
    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
    loading="lazy"
  />
</div>
```

## Liens

Chaque page de détail est accessible depuis la page d'accueil via le bouton "Voir les détails" sur la carte du projet correspondant.

- ZetouPanda : `/projects/zetoupanda.html`
- Shu-no : `/projects/shuno.html`
- Portfolio : `/projects/portfolio.html`

## Navigation

- **Retour aux projets** : Lien dans le header de chaque page (`index.html#projects`)
- **Retour à l'accueil** : Logo "AT" dans le header (`index.html`)
