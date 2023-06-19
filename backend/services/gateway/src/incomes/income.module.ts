import {Module} from "@nestjs/common";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {IncomeController} from "./income.controller";
import {IncomeService} from "./income.service";

@Module({
    imports:[
        ClientsModule.register([{
            name: 'INCOME_SERVICE',
            transport: Transport.TCP,
            options:{
                host: 'challenge-incomes-service',
                port: 3010,
            },
        },
        ]),
    ],
    controllers:[IncomeController],
    providers: [IncomeService]
})

export class IncomeModule{}