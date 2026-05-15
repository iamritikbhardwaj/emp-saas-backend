import { Worksite } from '../../worksite/entities/worksite.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contractors')
export class Contractor {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: 'pending' })
  status!: 'active' | 'pending' | 'suspended';

  // --- Company Information ---
  @Column()
  companyName!: string;

  @Column({ unique: true }) // Registration should be unique
  registrationNumber!: string;

  @Column({ unique: true, nullable: true })
  gstNumber!: string;

  @Column({ unique: true })
  panNumber!: string;

  // --- Contact Information ---
  @Column()
  email!: string;

  @Column({ nullable: true })
  password?: string;

  @Column()
  phone!: string;

  @Column({ nullable: true })
  alternatePhone!: string;

  // --- Address (Flat Structure for easier querying) ---
  @Column()
  addressLine1!: string;

  @Column({ nullable: true })
  addressLine2!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column()
  pincode!: string;

  // --- Work and Principal Employer Details ---
  @Column({ nullable: true })
  workLocation!: string;

  @Column({ nullable: true })
  principalEmployer!: string;

  @Column({ nullable: true })
  principalEmployerAddress!: string;

  @Column({ nullable: true })
  establishmentName!: string;

  @Column({ nullable: true })
  establishmentAddress!: string;

  // --- Primary Contact Person ---
  @Column()
  contactPersonName!: string;

  @Column()
  contactPersonDesignation!: string;

  @Column()
  contactPersonPhone!: string;

  @Column()
  contactPersonEmail!: string;

  // --- Subscription & Business Details ---
  @Column({ default: 'basic' })
  subscriptionPlan!: string;

  @Column({ type: 'int', default: 1 })
  numberOfSites!: number;

  @Column({ type: 'int', default: 0 })
  estimatedWorkers!: number;

  @Column()
  industryType!: string;

  // --- Relations & Metadata ---
  @OneToMany(() => Worksite, (worksite) => worksite.contractor)
  worksites!: Worksite[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
