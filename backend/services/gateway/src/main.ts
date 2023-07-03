import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { RcpExceptionsInterceptor } from "./rcp.exceptions.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new RcpExceptionsInterceptor());
  await app.listen(3000);
}

bootstrap();
