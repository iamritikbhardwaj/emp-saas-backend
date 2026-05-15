import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatutoryController } from './statutory.controller';
import { ExcelController } from './excel.controller';
import { StatutoryService } from './statutory.service';
import { Contractor } from '../contractor/entities/contractor.entity';
import { Employee } from '../employee/entities/employee.entity';
import { Wage } from '../wages/entities/wage.entity';
import { Deduction } from '../wages/entities/deduction.entity';
import { Advance } from '../advances/entities/advance.entity';
import { Muster } from '../muster/entities/muster.entity';
import { Employment } from '../employment/entities/employment.entity';
import { Worksite } from '../worksite/entities/worksite.entity';
import { ExcelService } from './excel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contractor,
      Employee,
      Wage,
      Deduction,
      Advance,
      Muster,
      Employment,
      Worksite,
    ]),
  ],
  controllers: [StatutoryController, ExcelController],
  providers: [StatutoryService, ExcelService],
})
export class StatutoryModule {}
