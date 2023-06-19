import {Column, PrimaryGeneratedColumn} from "typeorm";

export class EventBudget {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    amount: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date

    @Column()
    userId: string;
}
