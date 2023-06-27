# nestjs-microservices-demo

## Development

### Startup

```bash
docker compose up --detach
```

### Gateway

```bash
docker compose exec challenge-gateway-service npm install
docker compose exec challenge-gateway-service npm run start:dev
```

### Users

```bash
docker compose exec challenge-users-service npm install
docker compose exec challenge-users-service start:dev
```

### Incomes

```bash
docker compose exec challenge-incomes-service npm install
docker compose exec challenge-incomes-service npm run start:dev
```

### categories

```bash
docker compose exec challenge-categories-service npm install
docker compose exec challenge-categories-service npm run start:dev
```

### Expenses

```bash
docker compose exec challenge-expenses-service npm install
docker compose exec challenge-expenses-service npm run start:dev
```

### Events

```bash
docker compose exec challenge-events-service npm install
docker compose exec challenge-events-service npm run start:dev
```

### Debts

```bash
docker compose exec challenge-debts-service npm install
docker compose exec challenge-debts-service npm run start:dev
```

### Alerts

```bash
docker compose exec challenge-alerts-service npm install
docker compose exec challenge-alerts-service npm run start:dev
```

### Budgets

```bash
docker compose exec challenge-budgets-service npm install
docker compose exec challenge-budgets-service npm run start:dev
```

### Shutdown

```bash
docker compose down --remove-orphans --volumes --timeout 0
```

## Build & Push

```bash
docker compose -f docker-compose.build.yaml build
docker compose -f docker-compose.build.yaml push
```

## Deployment

```bash
docker swarm init --advertise-addr 127.0.0.1
docker stack deploy -c docker-compose.stack.yaml app
```

## Endpoints

| Method | Path     | Description   |
| ------ | -------- | ------------- |
| `GET`  | `/posts` | Get all posts |
| `POST` | `/posts` | Create a post |

## Build Micro services

Build micro service in nest

```bash
npx @nestjs/cli new ######
cd #####
npm i --save @nestjs/microservices
```

Read Dockerfile
Build service

```bash
docker build -t ronantr/challenge-#####-service:0.1.0 .
```

Build service and push in all platform

```bash
docker buildx build --push \
--platform linux/amd64,linux/arm64,linux/arm/v7,linux/arm/v8 \
--tag ronantr/challenge-#####-service:0.1.0 .
```
