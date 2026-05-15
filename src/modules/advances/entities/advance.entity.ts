import { Employee } from '../../employee/entities/employee.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Double } from 'typeorm';

@Entity()
export class Advance {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Employee)
  employee!: Employee;

  // In your Advance entity
  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  amount!: number;

  @Column()
  purpose!: string;

  @Column()
  issuedDate!: Date;

  @Column()
  installments!: number;
}
