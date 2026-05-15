import { Employee } from '../../employee/entities/employee.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Deduction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Employee)
  employee!: Employee;

  @Column()
  type!: string; // PF | ESI | DAMAGE | etc

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  amount!: number;

  @CreateDateColumn()
  date!: Date;
}
