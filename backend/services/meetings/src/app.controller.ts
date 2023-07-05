import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateMeetingDto, UpdateMeetingDto } from './meeting.request';

@Controller('meeting')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ service: 'meeting', action: 'create' })
  createMeeting(createMeetingDto: CreateMeetingDto) {
    return this.appService.create(createMeetingDto);
  }

  @MessagePattern({ service: 'meeting', action: 'getAll' })
  getAllMeetings() {
    return this.appService.getAll();
  }

  @MessagePattern({ service: 'meeting', action: 'getById' })
  getMeetingById(id: string) {
    return this.appService.getById(id);
  }

  @MessagePattern({ service: 'meeting', action: 'update' })
  updateMeeting(
    @Payload() payload: { id: string; updateMeetingDto: UpdateMeetingDto },
  ) {
    const { id, updateMeetingDto } = payload;
    return this.appService.update(id, updateMeetingDto);
  }

  @MessagePattern({ service: 'meeting', action: 'delete' })
  deleteMeeting(id: string) {
    return this.appService.delete(id);
  }
}
