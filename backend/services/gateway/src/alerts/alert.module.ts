import { Module } from '@nestjs/common';
import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ALERT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'challenge-alerts-service',
          port: 3006,
        },
      },
    ]),
  ],
  controllers: [AlertController],
  providers: [AlertService],
})
export class AlertModule {}
