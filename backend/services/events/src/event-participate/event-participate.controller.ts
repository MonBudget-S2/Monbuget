import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventParticipateService } from './event-participate.service';
import { CreateEventParticipateDto } from './dto/create-event-participate.dto';
import { UpdateEventParticipateDto } from './dto/update-event-participate.dto';

@Controller('event-participate')
export class EventParticipateController {
  constructor(private readonly eventParticipateService: EventParticipateService) {}

  @Post()
  create(@Body() createEventParticipateDto: CreateEventParticipateDto) {
    return this.eventParticipateService.create(createEventParticipateDto);
  }

  @Get()
  findAll() {
    return this.eventParticipateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventParticipateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventParticipateDto: UpdateEventParticipateDto) {
    return this.eventParticipateService.update(+id, updateEventParticipateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventParticipateService.remove(+id);
  }
}
