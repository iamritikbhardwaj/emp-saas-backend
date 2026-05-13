import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Worksite } from 'src/modules/worksite/entities/worksite.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fine {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Employee)
  employee!: Employee;

  @Column()
  reason!: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  amount!: number;

  @Column()
  date!: Date;
}
