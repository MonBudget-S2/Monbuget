import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ service: 'budget', action: 'create' })
  createBudget(data: { userId: string; amount: number }) {
    return this.appService.createBudget(data);
  }
}
