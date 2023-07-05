import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventInvitation } from './event-invitation.entity';
import { InvitationStatus } from './event-invitation.enum';

@Injectable()
export class EventInvitationService {
  constructor(
    @InjectRepository(EventInvitation)
    private eventInvitationRepository: Repository<EventInvitation>,
  ) {}

  async create(eventId: string, userId: string): Promise<any> {
    const newEventInvitation = this.eventInvitationRepository.create({
      eventId,
      userId,
      status: InvitationStatus.PENDING,
    });

    await this.eventInvitationRepository.save(newEventInvitation);
    return {
      message: 'Event invitation created successfully',
      newEventInvitation,
    };
  }

  async getById(id: string): Promise<EventInvitation | null> {
    return this.eventInvitationRepository.findOneBy({ id });
  }

  async getAll(): Promise<EventInvitation[]> {
    return this.eventInvitationRepository.find();
  }

  async getAllByUser(userId: string): Promise<EventInvitation[]> {
    return this.eventInvitationRepository.findBy({ userId });
  }

  async update(
    id: string,
    status: InvitationStatus,
  ): Promise<EventInvitation | null> {
    const eventInvitation = await this.eventInvitationRepository.findOneBy({
      id,
    });

    if (!eventInvitation) {
      return null; // Event invitation with the given ID not found
    }

    eventInvitation.status = status;
    eventInvitation.updatedAt = new Date();

    const updatedEventInvitation = await this.eventInvitationRepository.save(
      eventInvitation,
    );

    return updatedEventInvitation;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.eventInvitationRepository.delete(id);
    return result.affected > 0;
  }

  async getByEventId(eventId: string): Promise<EventInvitation[]> {
    return this.eventInvitationRepository.findBy({ eventId });
  }
}
