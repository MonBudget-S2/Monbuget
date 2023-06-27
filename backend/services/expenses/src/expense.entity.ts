import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column({ name: 'payment_method' })
  paymentMethod: string;

  @Column()
  location: string;

  @Column({ name: 'receiptImage' })
  receiptImage: string;

  @Column({ default: false })
  isPersonal: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'category_id', nullable: true })
  categoryId: number;

  @Column({ name: 'event_budget_id', nullable: true })
  eventBudgetId: number;
}
