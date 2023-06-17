.PHONY: start down restart

start:
	docker compose up -d
	docker-compose up -d
	docker compose exec -d challenge-gateway-service npm install 
	docker compose exec -d challenge-gateway-service npm run start:dev 
	docker compose exec -d challenge-users-service npm install 
	docker compose exec -d challenge-users-service npm run start:dev 
	docker compose exec -d challenge-incomes-service npm install 
	docker compose exec -d challenge-incomes-service npm run start:dev 
	docker compose exec -d challenge-expenses-service npm install 
	docker compose exec -d challenge-expenses-service npm run start:dev 
	docker compose exec -d challenge-categories-service npm install 
	docker compose exec -d challenge-categories-service npm run start:dev 
	docker compose exec -d challenge-events-service npm install 
	docker compose exec -d challenge-events-service npm run start:dev 
	docker compose exec -d challenge-debts-service npm install 
	docker compose exec -d challenge-debts-service npm run start:dev 
	docker compose exec -d challenge-alerts-service npm install 
	docker compose exec -d challenge-alerts-service npm run start:dev 
	docker compose exec -d challenge-budgets-service npm install 
	docker compose exec -d challenge-budgets-service npm run start:dev 

down:
	docker compose down
	docker-compose down

restart:
	down start
