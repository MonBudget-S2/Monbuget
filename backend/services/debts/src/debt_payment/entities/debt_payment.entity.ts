import {Column, PrimaryGeneratedColumn} from "typeorm";

export class DebtPayment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    amount: number;

    @Column()
    date: Date;

    @Column()
    debtId: string;

}
