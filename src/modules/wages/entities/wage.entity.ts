import { Employee } from '../../employee/entities/employee.entity';
import { Worksite } from '../../worksite/entities/worksite.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Employee)
  employee!: Employee;

  @ManyToOne(() => Worksite)
  worksite!: Worksite;

  @Column()
  month!: string; // "2025-12"

  @Column()
  totalDaysWorked!: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  basicWages!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  overtimeWages!: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  grossWages!: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  netWages!: number;
}
