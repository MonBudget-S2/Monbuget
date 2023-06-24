.PHONY: start down restart start-mac

start:
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


start-mac:
	docker-compose up 
	docker-compose exec  challenge-gateway-service rm -rf node_modules
	docker-compose exec  challenge-gateway-service npm install 
	docker-compose exec -d challenge-gateway-service npm run start:dev 
	docker-compose exec  challenge-users-service rm -rf node_modules
	docker-compose exec  challenge-users-service npm install 
	docker-compose exec -d challenge-users-service npm run start:dev 
	docker-compose exec -d challenge-incomes-service npm rm -rf node_modules
	docker-compose exec -d challenge-incomes-service npm run start:dev 
	docker-compose exec -d challenge-expenses-service npm rm -rf node_modules
	docker-compose exec -d challenge-expenses-service npm install 
	docker-compose exec -d challenge-expenses-service npm run start:dev 
	docker-compose exec -d challenge-categories-service npm rm -rf node_modules
	docker-compose exec -d challenge-categories-service npm install 
	docker-compose exec -d challenge-categories-service npm run start:dev 
	docker-compose exec -d challenge-events-service npm rm -rf node_modules
	docker-compose exec -d challenge-events-service npm install 
	docker-compose exec -d challenge-events-service npm run start:dev 
	docker-compose exec -d challenge-debts-service npm rm -rf node_modules
	docker-compose exec -d challenge-debts-service npm install 
	docker-compose exec -d challenge-debts-service npm run start:dev 
	docker-compose exec -d challenge-alerts-service npm rm -rf node_modules
	docker-compose exec -d challenge-alerts-service npm install 
	docker-compose exec -d challenge-alerts-service npm run start:dev 
	docker-compose exec -d challenge-budgets-service npm rm -rf node_modules
	docker-compose exec -d challenge-budgets-service npm install 
	docker-compose exec -d challenge-budgets-service npm run start:dev 

down:
	docker compose down
	docker-compose down

restart:
	down start
