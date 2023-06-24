import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BudgetModule } from "./budgets/budget.module";
import { AlertModule } from "./alerts/alert.module";
import { CategoryModule } from "./categories/category.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { UserModule } from "./users/user.module";
import { IncomeModule } from "./incomes/income.module";

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
        name: "EXPENSE_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "challenge-expenses-service",
          port: 3004,
        },
      },

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
    ]),
    BudgetModule,
    AlertModule,
    CategoryModule,
    AuthenticationModule,
    UserModule,
    IncomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
