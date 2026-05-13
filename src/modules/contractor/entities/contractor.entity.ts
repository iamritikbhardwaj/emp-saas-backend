import { Worksite } from 'src/modules/worksite/entities/worksite.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contractor {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @OneToMany(() => Worksite, (worksite) => worksite.contractor)
  worksites!: Worksite[];
}
