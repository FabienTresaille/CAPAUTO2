#!/bin/sh
set -e

# Initialize database if it doesn't exist
if [ ! -f /app/data/capauto.db ]; then
  echo "🗄️  Initialisation de la base de données..."
  cd /app && npx tsx src/lib/seed.ts || echo "⚠️  Seed skipped (run manually if needed)"
  # Move db to persistent volume
  if [ -f /app/capauto.db ]; then
    mv /app/capauto.db /app/data/capauto.db
  fi
fi

# Symlink db from persistent volume
if [ -f /app/data/capauto.db ] && [ ! -f /app/capauto.db ]; then
  ln -sf /app/data/capauto.db /app/capauto.db
fi

echo "🚗 CAP'AUTO démarrage..."
exec "$@"
