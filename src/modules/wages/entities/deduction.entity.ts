import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Deduction {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Employee)
  employee!: Employee;

  @Column()
  type!: string; // PF | ESI | DAMAGE | etc

  @Column()
  amount!: number;

  @Column()
  date!: Date;
}
