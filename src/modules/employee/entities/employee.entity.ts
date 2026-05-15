import { Employment } from '../../employment/entities/employment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  fatherName!: string;

  @Column()
  gender!: string;

  @Column({ nullable: true })
  dob!: Date;

  @Column({ nullable: true })
  identificationMark!: string;

  @Column({ nullable: true })
  uan!: string;

  @Column({ nullable: true })
  esic!: string;

  @Column({ nullable: true })
  permanentAddress!: string;

  @Column({ nullable: true })
  presentAddress!: string;

  @OneToMany(() => Employment, (e) => e.employee)
  employments!: Employment[];
}
