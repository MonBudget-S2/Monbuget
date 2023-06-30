import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Budget } from './budget.entity';
import config from './typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Budget]),
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
        name: 'EXPENSE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'challenge-expenses-service',
          port: 3004,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
