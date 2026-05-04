#!/bin/sh
set -e

# Initialize database if it doesn't exist in persistent volume
if [ ! -f /app/data/capauto.db ]; then
  echo "🗄️  Initialisation de la base de données persistante..."
  if [ -f /app/capauto.db.template ]; then
    cp /app/capauto.db.template /app/data/capauto.db
  fi
fi

echo "🚗 CAP'AUTO démarrage..."
exec "$@"
