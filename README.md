# Challenge-Semestriel-2

Challenge ApiPlatform



## Requirements

* [Install Docker](https://docs.docker.com/get-docker/) (with [docker-compose](https://docs.docker.com/compose/install/))

## Getting Started

Make a git clone of this repository and in the created folder, run this command line :

```bash
git https://github.com/MonBudget-S2/Monbuget.git
cd MonBuget/Nest
docker-compose build --pull --no-cache
docker-compose up -d
cd ..
cd Frontend
netlify deploy --dir web-build
docker compose exec php sh -c '
    set -e
    apk add openssl
    php bin/console lexik:jwt:generate-keypair
    setfacl -R -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt
    setfacl -dR -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt
    docker compose exec php php bin/console d:d:d --force
    docker compose exec php php bin/console d:d:c
    docker compose exec php php bin/console d:s:u --force
    docker compose exec php php bin/console d:f:l --no-interaction
'
```

```
# URL
https://localhost
```

## Contributors

* **Kurunchi CHANDRA** - [kchandra77](https://github.com/kchandra77)
* **Thushanth PATHMASEELAN** - [pthushanth](https://github.com/pthushanth)
* **Chaochao Zhou** - [Chaochao-z](https://github.com/Chaochao-z)
* **Ronan Trouillard** - [ronantr](https://github.com/ronantr)
