import { Injectable } from '@nestjs/common';
import {
  CreateEventParticipateDto,
  UpdateEventParticipateDto,
} from './event-participate.request';
@Injectable()
export class EventParticipateService {
  create(createEventParticipateDto: CreateEventParticipateDto) {
    return 'This action adds a new eventParticipate';
  }

  findAll() {
    return `This action returns all eventParticipate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventParticipate`;
  }

  update(id: number, updateEventParticipateDto: UpdateEventParticipateDto) {
    return `This action updates a #${id} eventParticipate`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventParticipate`;
  }
}
