import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Make column optional
  @Column({ nullable: true })
  description: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column()
  location: string;

  @Column({ name: 'receiptImage', nullable: true })
  receiptImage: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'category_id', nullable: true })
  categoryId: string;

  @Column({ name: 'event_budget_id', nullable: true })
  eventBudgetId: string;

  @BeforeInsert()
  private setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  private setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
