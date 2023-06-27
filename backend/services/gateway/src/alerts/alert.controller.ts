import { Controller, Post, Body, UseGuards, Get, Put, Delete, Param } from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateAlertDto, UpdateAlertDto } from './alert.request';

@Controller("alerts")
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  createAlert(@Body() createAlertDto: CreateAlertDto) {
    return this.alertService.createAlert(createAlertDto);
  }

  @Get()
  getAllAlerts() {
    return this.alertService.getAllAlerts();
  }

  @Get(":id")
  getAlertById(@Param("id") id: string) {
    return this.alertService.getAlertById(id);
  }

  @Put(":id")
  updateAlert(@Param("id") id: string, @Body() updateAlertDto: UpdateAlertDto) {
    return this.alertService.updateAlert(id, updateAlertDto);
  }

  @Delete(":id")
  deleteAlert(@Param("id") id: string) {
    return this.alertService.deleteAlert(id);
  }

}
