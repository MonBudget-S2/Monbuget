import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
@Entity()
export class Debt {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    motif: string;

    @Column()
    amount: number;

    @Column()
    remainingAmount: number;

    @Column()
    dueDate: Date;

    @Column()
    debtType: string;

    @Column()
    userId: string;

    @Column()
    eventBudgetId: string;

}
