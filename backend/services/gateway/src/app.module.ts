import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BudgetModule } from "./budgets/budget.module";

@Module({
  imports: [
    BudgetModule,
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "challenge-users-service",
          port: 3002,
        },
      },
      {
        name: "INCOME_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "challenge-incomes-service",
          port: 3003,
        },
      },
      {
        name: "EXPENSE_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "challenge-expenses-service",
          port: 3004,
        },
      },
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
