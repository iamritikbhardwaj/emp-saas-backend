import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wage } from './wage.entity';
import { Double } from 'typeorm/browser';

@Entity()
export class WageSlip {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => Wage)
  @JoinColumn()
  wage!: Wage;

  @CreateDateColumn()
  generatedAt!: Date;

  @Column()
  employeeName!: string;

  @Column()
  daysWorked!: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  grossWages!: Double;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  deductions!: Double;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  netWages!: Double;
}
