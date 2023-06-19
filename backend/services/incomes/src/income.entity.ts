import {PrimaryGeneratedColumn, Column} from 'typeorm'
export class Income {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    userId: string

    @Column()
    type: string

    @Column()
    amount: number

    @Column()
    date: Date

}
