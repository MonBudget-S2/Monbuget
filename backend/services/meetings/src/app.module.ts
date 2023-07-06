import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from './meeting.entity';
import config from './typeorm.config';
import { Schedule } from './schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Meeting, Schedule]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
