import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // forwardRef(() => UsersModule),
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "challenge-users-service",
          port: 3002,
        },
      }]),
    JwtModule.register({
      global: true,
      secret:
        'I SWEAR TO GOD IF I SEE THIS IN A REAL PROJECT I WILL KILL YOU DO YOU UNDERSTAND???',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
