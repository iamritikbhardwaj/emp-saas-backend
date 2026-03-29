import { Worksite } from 'src/modules/worksite/entities/worksite.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PrincipalEmployer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @OneToMany(() => Worksite, (worksite) => worksite.principalEmployer)
  worksites!: Worksite[];
}
