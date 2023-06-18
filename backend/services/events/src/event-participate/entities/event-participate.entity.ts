import {Column, PrimaryGeneratedColumn} from "typeorm";

export class EventParticipate {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    amountPaid: number;

    @Column()
    userId: string;

    @Column()
    eventBudgetId: string;

}
