import { Inject, Injectable, } from '@nestjs/common';

import {
    ClientProxy,
    ClientProxyFactory,
    Transport
} from "@nestjs/microservices";
import {CreateCategoryDto, UpdateCategoryDto} from "../categories/category.request";
import {firstValueFrom} from "rxjs";
import {CreateIncomeDto, UpdateIncomeDto} from "./income.request";

@Injectable()
export class IncomeService{

    constructor(
        @Inject("INCOME_SERVICE") private readonly incomeService: ClientProxy
    ) {}

    async createIncome(createIncomeDto: CreateIncomeDto) {
        return await firstValueFrom(
            this.incomeService.send(
                { service: "category", cmd: "create" },
                { category: createIncomeDto }
            )
        );
    }

    async getAllIncomes() {
        return await firstValueFrom(
            this.incomeService.send({ service: "income", cmd: "getAll" }, {})
        );
    }

    async getIncomeById(id: string) {
        return await firstValueFrom(
            this.incomeService.send({ service: "income", cmd: "getById" }, { id })
        );
    }

    async updateIncome(id: string, updateIncomeDto: UpdateIncomeDto) {
        return await firstValueFrom(
            this.incomeService.send({ service: "income", cmd: "update" }, { id, category: updateIncomeDto })
        );
    }

    async deleteIncome(id: string) {
        return await firstValueFrom(
            this.incomeService.send({ service: "income", cmd: "delete" }, { id })
        );
    }
}