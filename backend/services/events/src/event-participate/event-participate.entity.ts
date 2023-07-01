import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EventParticipate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  amountPaid: number;

  @Column()
  userId: string;

  @Column()
  eventBudgetId: string;
}
