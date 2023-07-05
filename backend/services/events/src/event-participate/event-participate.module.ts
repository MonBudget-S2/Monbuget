import { Module } from '@nestjs/common';
import { EventParticipateService } from './event-participate.service';
import { EventParticipateController } from './event-participate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventParticipate } from './event-participate.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventParticipate]),
    ClientsModule.register([
      {
        name: 'EVENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'challenge-events-service',
          port: 3009,
        },
      },

    ],
    ),
    ClientsModule.register([
      {
          name: "USER_SERVICE",
          transport: Transport.TCP,
          options: {
            host: "challenge-users-service",
            port: 3002,
          },
        },
    ]),
    
    
  ],
  controllers: [EventParticipateController],
  providers: [EventParticipateService],
  exports: [EventParticipateService],
})
export class EventParticipateModule {}
