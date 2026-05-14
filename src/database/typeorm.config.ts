import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Advance } from '../modules/advances/entities/advance.entity';
import { Contractor } from '../modules/contractor/entities/contractor.entity';
import { Employee } from '../modules/employee/entities/employee.entity';
import { Employment } from '../modules/employment/entities/employment.entity';
import { Fine } from '../modules/fines/entities/fine.entity';
import { Muster } from '../modules/muster/entities/muster.entity';
import { PrincipalEmployer } from '../modules/principal-employer/entities/principal-employer.entity';
import { Wage } from '../modules/wages/entities/wage.entity';
import { Worksite } from '../modules/worksite/entities/worksite.entity';
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 22957,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true, // dev only
  entities: [
    Advance,
    Contractor,
    Employee,
    Employment,
    Fine,
    Muster,
    PrincipalEmployer,
    Wage,
    Worksite,
  ],
  ssl: {
    rejectUnauthorized: false,
  },
};
