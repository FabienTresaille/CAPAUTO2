# CAP'AUTO — Conseiller Automobile Privilégié

Site vitrine pour concessionnaire automobile d'occasion avec back-office d'administration du catalogue véhicules.

## 🚗 Fonctionnalités

### Site public
- **Accueil** — Slider héro, CTA (J'achète / Je vends / Je recherche), avis Google, engagements, services
- **Stock** — Catalogue véhicules avec photos + lien Leboncoin
- **Recherche personnalisée** — Filtres par marque, boîte, kilométrage
- **Services** — Achat cash, vente occasion, sélection soignée, livraison domicile
- **Confiance** — Témoignages clients, marques partenaires
- **Contact** — Formulaire avec suggestions (achat cash, visite véhicules)

### Back-office admin (`/admin`)
- Connexion sécurisée (NextAuth)
- Ajout / modification / suppression de véhicules
- Upload multiple de photos (drag & drop)
- Gestion des véhicules "featured" (slider accueil)
- Consultation des messages de contact

## 🛠 Stack technique

| Élément | Technologie |
|---|---|
| Framework | Next.js 14 (App Router) |
| Langage | TypeScript |
| Style | Vanilla CSS |
| Base de données | SQLite (better-sqlite3) |
| Auth | NextAuth.js (credentials) |
| Upload | API Route + stockage local |
| Déploiement | Docker + Traefik |

## 🎨 Design

- **Couleur primaire** : `#8B1A1A` (rouge crimson)
- **Couleur secondaire** : `#111111` (noir profond)
- **Typographies** : Oswald (titres) + Barlow (corps)
- **Style** : Premium, dark theme, animations scroll

## 🚀 Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos identifiants admin

# 3. Initialiser la base de données avec les données démo
npm run seed

# 4. Lancer en développement
npm run dev
```

Le site est accessible sur `http://localhost:3000`

## 🔐 Accès admin

- URL : `/admin/login`
- Identifiants par défaut (dev) : `admin` / `capauto2025`
- **⚠️ Changer le mot de passe dans `.env.local` en production**

## 🐳 Déploiement Docker (Production)

### Prérequis
- Docker & Docker Compose installés sur le VPS
- Traefik v3.1 configuré avec le réseau `audit-app_web`
- Resolver SSL `letsencrypt` actif

### 1. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Éditer `.env.local` :
```env
NEXTAUTH_URL=https://capauto.alsek.fr
NEXTAUTH_SECRET=<générer avec: openssl rand -base64 32>
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<mot_de_passe_sécurisé>
```

### 2. Lancer le conteneur

```bash
docker compose up -d --build
```

Le site sera accessible sur `https://capauto.alsek.fr` via Traefik.

### 3. Volumes persistants

| Volume | Usage |
|---|---|
| `capauto_data` | Base de données SQLite |
| `capauto_uploads` | Photos des véhicules uploadées |

### 4. Commandes utiles

```bash
# Voir les logs
docker logs -f capauto

# Reconstruire après une mise à jour
docker compose up -d --build --force-recreate

# Réinitialiser la base de données (⚠️ supprime tout)
docker exec capauto rm /app/data/capauto.db
docker compose restart capauto
```

### Architecture réseau

```
Internet → Traefik (443) → capauto:3000
                ↓
         audit-app_web (réseau Docker externe)
```

## 📁 Arborescence

```
src/
├── app/
│   ├── page.tsx              # Accueil
│   ├── stock/page.tsx        # Catalogue véhicules
│   ├── recherche/page.tsx    # Recherche personnalisée
│   ├── services/page.tsx     # Page services + formulaire vente
│   ├── confiance/page.tsx    # Témoignages
│   ├── contact/page.tsx      # Formulaire contact
│   ├── admin/
│   │   ├── login/page.tsx    # Connexion admin
│   │   ├── dashboard/page.tsx # Liste véhicules
│   │   └── vehicules/
│   │       ├── new/page.tsx  # Ajout véhicule
│   │       └── [id]/edit/page.tsx # Modification
│   └── api/
│       ├── auth/             # NextAuth
│       ├── vehicles/         # CRUD véhicules
│       ├── upload/           # Upload photos
│       └── contact/          # Messages
├── components/               # Composants réutilisables
├── lib/
│   ├── db.ts                 # SQLite
│   ├── auth.ts               # Config NextAuth
│   └── seed.ts               # Données démo
└── middleware.ts              # Protection routes admin
```

## 📝 Crédits

Site réalisé par **Agence iA — Marketing Digital**
