import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './meeting.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { CreateMeetingDto, UpdateMeetingDto } from './meeting.request';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
  ) {}

  async create(createMeetingDto: CreateMeetingDto): Promise<any> {
    console.log('createMeetingDto', createMeetingDto);
    const newMeeting = this.meetingRepository.create(createMeetingDto);
    console.log('newMeeting', newMeeting);
    await this.meetingRepository.save(newMeeting);
    return { message: 'Meeting created successfully', newMeeting };
  }

  async getById(id: string): Promise<Meeting | null> {
    return this.meetingRepository.findOneBy({ id });
  }

  async getAll(): Promise<Meeting[]> {
    return this.meetingRepository.find();
  }

  async update(
    id: string,
    updateMeetingDto: UpdateMeetingDto,
  ): Promise<Meeting | null> {
    console.log('updateMeetingDto', updateMeetingDto);
    const meeting = await this.meetingRepository.findOneBy({ id });
    if (!meeting) {
      throw new RpcException('Meeting not found');
    }
    const updatedMeeting = await this.meetingRepository.save({
      ...meeting,
      ...updateMeetingDto,
    });

    console.log('updatedMeeting', updatedMeeting);

    return updatedMeeting;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.meetingRepository.delete(id);
    return result.affected > 0;
  }
}
