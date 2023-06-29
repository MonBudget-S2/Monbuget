import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Expense } from './expense.entity';
import config from './typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Expense]),
    ClientsModule.register([
      {
        name: 'CATEGORY_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'challenge-categories-service',
          port: 3007,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'EVENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'challenge-events-service',
          port: 3009,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
