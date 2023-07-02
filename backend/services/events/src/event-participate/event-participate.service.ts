import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventParticipate } from './event-participate.entity';
import {
  CreateEventParticipateDto,
  UpdateEventParticipateDto,
} from './event-participate.request';

@Injectable()
export class EventParticipateService {
  constructor(
    @InjectRepository(EventParticipate)
    private eventParticipateRepository: Repository<EventParticipate>,
  ) {}

  async create(
    createEventParticipateDto: CreateEventParticipateDto,
  ): Promise<any> {
    const newEventParticipate = this.eventParticipateRepository.create(
      createEventParticipateDto,
    );
    await this.eventParticipateRepository.save(newEventParticipate);
    return {
      message: 'Event participate created successfully',
      newEventParticipate,
    };
  }

  async getById(id: string): Promise<EventParticipate | null> {
    return this.eventParticipateRepository.findOneBy({ id });
  }

  async getAll(): Promise<EventParticipate[]> {
    return this.eventParticipateRepository.find();
  }

  async getAllByUser(userId: string): Promise<EventParticipate[]> {
    return this.eventParticipateRepository.find({ where: { userId } });
  }

  async update(
    id: string,
    updateEventParticipateDto: UpdateEventParticipateDto,
  ): Promise<EventParticipate | null> {
    const eventParticipate = await this.eventParticipateRepository.findOneBy({
      id,
    });

    if (!eventParticipate) {
      return null; // Event participate with the given ID not found
    }

    const updatedEventParticipate = Object.assign(
      eventParticipate,
      updateEventParticipateDto,
    );
    await this.eventParticipateRepository.save(updatedEventParticipate);

    return updatedEventParticipate;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.eventParticipateRepository.delete(id);
    return result.affected > 0;
  }

  async getByEventBudgetId(eventBudgetId: string): Promise<EventParticipate[]> {
    return this.eventParticipateRepository.find({ where: { eventBudgetId } });
  }

  async getByEventBudgetIdAndUserId(
    eventBudgetId: string,
    userId: string,
  ): Promise<EventParticipate | null> {
    return this.eventParticipateRepository.findOneBy({
      eventBudgetId,
      userId,
    });
  }
}
