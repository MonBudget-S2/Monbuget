import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ service: 'expense', cmd: 'createExpense' })
  async createExpense(data: any): Promise<any> {
    return this.appService.createExpense(data);
  }
}
