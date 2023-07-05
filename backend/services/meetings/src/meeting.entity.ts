import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MeetingRequestStatus } from './meeting.enum';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  advisorId: string;

  @Column()
  clientId: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({ default: MeetingRequestStatus.PENDING })
  status: MeetingRequestStatus;
}
