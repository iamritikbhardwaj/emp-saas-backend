import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Advance {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Employee)
  employee!: Employee;

  @Column()
  amount!: number;

  @Column()
  purpose!: string;

  @Column()
  issuedDate!: Date;

  @Column()
  installments!: number;
}
