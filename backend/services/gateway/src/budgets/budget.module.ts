import { Module } from "@nestjs/common";
import { BudgetController } from "./budget.controller";
import { BudgetService } from "./budget.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthenticationModule } from "src/authentication/authentication.module";

@Module({
  imports: [
    AuthenticationModule,
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "challenge-users-service",
          port: 3002,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: "BUDGET_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "challenge-budgets-service",
          port: 3005,
        },
      },
    ]),
  ],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
