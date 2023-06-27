import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateAlertDto, UpdateAlertDto } from './alert.request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ service: 'alert', action: 'create' })
  createAlert(alert: CreateAlertDto) {
    return this.appService.create(alert);
  }

  @MessagePattern({ service: 'alert', action: 'getAll' })
  getAllAlerts() {
    return this.appService.getAll();
  }

  @MessagePattern({ service: 'alert', action: 'getById' })
  getAlertById(id: string) {
    return this.appService.getById(id);
  }

  @MessagePattern({ service: 'alert', action: 'update' })
  updateAlert({ id, alert }: { id: string; alert: UpdateAlertDto }) {
    return this.appService.update(id, alert);
  }

  @MessagePattern({ service: 'alert', action: 'delete' })
  deleteAlert(id: string) {
    return this.appService.delete(id);
  }
}
