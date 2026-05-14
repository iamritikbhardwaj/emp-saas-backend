import { Employee } from '../../employee/entities/employee.entity';
import { Worksite } from '../../worksite/entities/worksite.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Employee, (e) => e.employments)
  employee!: Employee;

  @ManyToOne(() => Worksite, (w) => w.employments)
  worksite!: Worksite;

  @Column()
  workNature!: string;

  @Column()
  wageRate!: number;

  @Column()
  fromDate!: Date;

  @Column()
  toDate!: Date;
}
