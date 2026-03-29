import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wage } from './wage.entity';

@Entity()
export class WageSlip {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Wage)
  @JoinColumn()
  wage!: Wage;

  @Column()
  generatedAt!: Date;

  @Column()
  employeeName!: string;

  @Column()
  daysWorked!: number;

  @Column()
  grossWages!: number;

  @Column()
  deductions!: number;

  @Column()
  netWages!: number;
}
