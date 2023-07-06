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
import { ExpenseModule } from "./expenses/expense.module";
import { EventModule } from "./events/event.module";
import { DebtModule } from "./debts/debt.module";
import { MailModule } from './mail/mail.module';
import {MailService} from "./mail/mail.service";
import {UserService} from "./users/user.service";

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
        name: "MEETING_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "challenge-meetings-service",
          port: 3011,
        },
      },
    ]),
    BudgetModule,
    AlertModule,
    CategoryModule,
    AuthenticationModule,
    UserModule,
    IncomeModule,
    ExpenseModule,
    EventModule,
    DebtModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
      AppService,
      MailService,
      UserService,
  ],
})
export class AppModule {}
