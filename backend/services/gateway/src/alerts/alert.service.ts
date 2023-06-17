import { Inject, Injectable, Logger } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { CreateAlertDto, UpdateAlertDto } from "./alert.request";

@Injectable()
export class AlertService {


  constructor(
    @Inject("BUDGET_SERVICE") private readonly alertService: ClientProxy

  ) {}
    
  async createAlert(createAlertDto: CreateAlertDto) {
    return await firstValueFrom(
      this.alertService.send(
        { service: "alert", cmd: "create" },
        { alert: createAlertDto }
      )
    );
}
async getAllAlerts() {
    return await firstValueFrom(
      this.alertService.send({ service: "alert", cmd: "getAll" }, {})
    );
  }

  async getAlertById(id: string) {
    return await firstValueFrom(
      this.alertService.send({ service: "alert", cmd: "getById" }, { id })
    );
  }

  async updateAlert(id: string, updateAlertDto: UpdateAlertDto) {
    return await firstValueFrom(
      this.alertService.send({ service: "alert", cmd: "update" }, { id, alert: updateAlertDto })
    );
  }

  async deleteAlert(id: string) {
    return await firstValueFrom(
      this.alertService.send({ service: "alert", cmd: "delete" }, { id })
    );
  }
}

