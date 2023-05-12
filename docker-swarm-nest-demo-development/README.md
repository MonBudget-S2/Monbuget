# nestjs-microservices-demo

## Development

### Startup

```bash
docker compose up --detach
```

### Gateway

```bash
docker compose exec challange-gateway-service npm install
docker compose exec challange-gateway-service npm run start:dev
```

### Posts

```bash
docker compose exec posts-service npm install
docker compose exec posts-service npm run start:dev
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

Method | Path | Description
---|---|---
`GET` | `/posts` | Get all posts
`POST` | `/posts` | Create a post

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
docker build -t ronantr/challange-#####-service:0.1.0 . 
```

Build service and push in all platform 

```bash
docker buildx build --push \                             
--platform linux/amd64,linux/arm64,linux/arm/v7,linux/arm/v8 \
--tag ronantr/challange-#####-service:0.1.0 .
```
