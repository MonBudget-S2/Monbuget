#!/bin/bash

set -e
set -u

function create_database() {
	local database=$1
	echo "  Creating database '$database'"
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	    CREATE DATABASE $database;
EOSQL
}

# Parcourez les variables d'environnement pour créer les bases de données individuelles
for ((i=1;;i++)); do
  db_var="POSTGRES_MULTIPLE_DATABASES${i}"
  if [ -n "${!db_var:-}" ]; then
    create_database "${!db_var}"
  else
    break
  fi
done

echo "Toutes les bases de données ont été créées avec succès."
