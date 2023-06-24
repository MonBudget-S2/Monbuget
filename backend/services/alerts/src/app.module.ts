import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './alert.entity';
import config from './typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Alert])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
