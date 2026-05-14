import { Contractor } from '../../contractor/entities/contractor.entity';
import { Employment } from '../../employment/entities/employment.entity';
import { PrincipalEmployer } from '../../principal-employer/entities/principal-employer.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Worksite {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  location!: string;

  @ManyToOne(() => Contractor, (c) => c.worksites)
  contractor!: Contractor;

  @ManyToOne(() => PrincipalEmployer, (p) => p.worksites)
  principalEmployer!: PrincipalEmployer;

  @OneToMany(() => Employment, (e) => e.worksite)
  employments!: Employment[];
}
