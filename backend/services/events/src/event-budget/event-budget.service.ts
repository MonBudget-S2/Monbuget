import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventBudget } from './event-budget.entity';
import { Repository } from 'typeorm';
import {
  CreateEventBudgetDto,
  UpdateEventBudgetDto,
} from './event-budget.request';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(EventBudget)
    private eventBudgetRepository: Repository<EventBudget>,
  ) {}

  async create(createEventBudgetDto: CreateEventBudgetDto): Promise<any> {
    const newEventBudget =
      this.eventBudgetRepository.create(createEventBudgetDto);
    await this.eventBudgetRepository.save(newEventBudget);
    return { message: 'Event budget created successfully', newEventBudget };
  }

  async getById(id: string): Promise<EventBudget | null> {
    return this.eventBudgetRepository.findOneByOrFail({ id });
  }

  async getAll(): Promise<EventBudget[]> {
    return this.eventBudgetRepository.find();
  }

  async getAllByUser(userId: string): Promise<EventBudget[]> {
    return this.eventBudgetRepository.find({ where: { userId } });
  }

  async update(
    id: string,
    updateEventBudgetDto: UpdateEventBudgetDto,
  ): Promise<EventBudget | null> {
    const eventBudget = await this.eventBudgetRepository.findOneByOrFail({
      id,
    });

    if (!eventBudget) {
      return null; // Event budget with the given ID not found
    }

    const updatedEventBudget = await this.eventBudgetRepository.save({
      ...eventBudget,
      ...updateEventBudgetDto,
    });

    return updatedEventBudget;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.eventBudgetRepository.delete(id);
    return result.affected > 0;
  }
}
