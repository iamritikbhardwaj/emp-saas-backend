import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Worksite } from 'src/modules/worksite/entities/worksite.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wage {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Employee)
  employee!: Employee;

  @ManyToOne(() => Worksite)
  worksite!: Worksite;

  @Column()
  month!: string; // "2025-12"

  @Column()
  totalDaysWorked!: number;

  @Column()
  basicWages!: number;

  @Column({ default: 0 })
  overtimeWages!: number;

  @Column()
  grossWages!: number;

  @Column()
  netWages!: number;
}

// ! wageslip entity is pending
