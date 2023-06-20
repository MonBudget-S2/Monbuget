import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BudgetModule } from "./budgets/budget.module";
import { AlertModule } from "./alerts/alert.module";
import { CategoryModule } from "./categories/category.module";
import { AuthenticationModule } from "./authentication/authentication.module";

@Module({
  imports: [
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
      // {
      //   name: "BUDGET_SERVICE",
      //   transport: Transport.TCP,
      //   options: {
      //     host: "challenge-budgets-service",
      //     port: 3005,
      //   },
      // },
      // {
      //   name: "CATEGORY_SERVICE",
      //   transport: Transport.TCP,
      //   options: {
      //     host: "challenge-categories-service",
      //     port: 3007,
      //   },
      // },
      // {
      //   name: "ALERT_SERVICE",
      //   transport: Transport.TCP,
      //   options: {
      //     host: "challenge-alerts-service",
      //     port: 3006,
      //   },
      // },
      {
        name: "DEBT_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "challenge-debts-service",
          port: 3008,
        },
      },
      {
        name: "EVENT_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "challenge-events-service",
          port: 3009,
        },
      },
      {
        name: "INCOME_SERVICE",
        transport: Transport.TCP,
        options: {
           host : "challenge-incomes-service",
           port:3010,
        }
      }
    ]),
    BudgetModule,
    AlertModule,
    CategoryModule,
    AuthenticationModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
