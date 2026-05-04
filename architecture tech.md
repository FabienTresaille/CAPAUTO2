# ARCHITECTURE TECHNIQUE - CAPAUTO

## Réseau & Proxy (Traefik v3.1)
- **Réseau Docker Externe** : `audit-app_web` (Impératif pour le routage).
- **Certificat SSL** : Resolver `letsencrypt` (déjà configuré sur le VPS).
- **Entrypoints** : `websecure` (port 443).