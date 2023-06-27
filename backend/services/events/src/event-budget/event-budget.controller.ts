import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventBudgetService } from './event-budget.service';
import { CreateEventBudgetDto, UpdateEventBudgetDto } from './event-budget.request';

@Controller('event-budget')
export class EventBudgetController {
  constructor(private readonly eventBudgetService: EventBudgetService) {}

  @Post()
  create(@Body() createEventBudgetDto: CreateEventBudgetDto) {
    return this.eventBudgetService.create(createEventBudgetDto);
  }

  @Get()
  findAll() {
    return this.eventBudgetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventBudgetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventBudgetDto: UpdateEventBudgetDto) {
    return this.eventBudgetService.update(+id, updateEventBudgetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventBudgetService.remove(+id);
  }
}
