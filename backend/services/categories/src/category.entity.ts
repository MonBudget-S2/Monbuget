import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  severity: string;

  @Column()
  message: string;

  @Column()
  readAt: Date;

  @Column()
  userId: string;
}
