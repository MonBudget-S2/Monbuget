import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config';
import { Income } from './income.entity';

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Income])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
