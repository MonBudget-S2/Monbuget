import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Budget } from './budget.entity';
import config from './typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Budget])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
