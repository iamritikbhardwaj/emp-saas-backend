import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Worksite } from 'src/modules/worksite/entities/worksite.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Muster {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Employee)
  employee!: Employee;

  @ManyToOne(() => Worksite)
  worksite!: Worksite;

  @Column()
  date!: Date;

  @Column({ default: false })
  present!: boolean;

  @Column({ default: 0 })
  unitsWorked!: number;
}
