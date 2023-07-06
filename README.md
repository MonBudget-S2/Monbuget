# Challenge-Semestriel-2

Challenge Semestriel 2 

Nest.js 



## Requirements

* [Install Docker](https://docs.docker.com/get-docker/) (with [docker-compose](https://docs.docker.com/compose/install/))
* or Kubernetes 

## Getting Started

Make a git clone of this repository and in the created folder, run this command line :

```bash
git https://github.com/MonBudget-S2/Monbuget.git
cd MonBuget/backend
make start
```
or
```bash
git https://github.com/MonBudget-S2/Monbuget.git
cd MonBuget/backend
	docker compose up -d
	docker compose exec challenge-gateway-service rm -rf node_modules
	docker compose exec challenge-gateway-service npm install 
	docker compose exec -d challenge-gateway-service npm run start:dev 
	docker compose exec challenge-users-service rm -rf node_modules
	docker compose exec challenge-users-service npm install
	docker compose exec -d challenge-users-service npm run start:dev 
	docker compose exec challenge-incomes-service  rm -rf node_modules
	docker compose exec challenge-incomes-service npm install
	docker compose exec -d challenge-incomes-service npm run start:dev 
	docker compose exec challenge-expenses-service rm -rf node_modules
	docker compose exec challenge-expenses-service npm install 
	docker compose exec -d challenge-expenses-service npm run start:dev 
	docker compose exec challenge-categories-service rm -rf node_modules
	docker compose exec challenge-categories-service npm install 
	docker compose exec -d challenge-categories-service npm run start:dev 
	docker compose exec challenge-events-service rm -rf node_modules
	docker compose exec challenge-events-service npm install 
	docker compose exec -d challenge-events-service npm run start:dev 
	docker compose exec challenge-debts-service rm -rf node_modules
	docker compose exec challenge-debts-service npm install 
	docker compose exec -d challenge-debts-service npm run start:dev 
	docker compose exec challenge-alerts-service rm -rf node_modules
	docker compose exec challenge-alerts-service npm install 
	docker compose exec -d challenge-alerts-service npm run start:dev 
	docker compose exec challenge-budgets-service  rm -rf node_modules
	docker compose exec challenge-budgets-service npm install 
	docker compose exec -d challenge-budgets-service npm run start:dev 
	docker compose exec challenge-meetings-service  rm -rf node_modules
	docker compose exec challenge-meetings-service npm install 
	docker compose exec -d challenge-meetings-service npm run start:dev 
```
for start front in dev

```bash
cd Frontend
docker-compose up -d --build
```

```
# URL DEV API
https://localhost:3000
# URL DEV FRONT
https://localhost:3001
```

### URL PROD

- https://monbuget.fr

- https://api.monbuget.fr

## Contributors

* **Kurunchi CHANDRA** - [kchandra77](https://github.com/kchandra77)
* **Thushanth PATHMASEELAN** - [pthushanth](https://github.com/pthushanth)
* **Chaochao Zhou** - [Chaochao-z](https://github.com/Chaochao-z)
* **Ronan Trouillard** - [ronantr](https://github.com/ronantr)
