import { Module } from '@nestjs/common';
import { WagesService } from './wages.service';
import { WagesController } from './wages.controller';
import { Wage } from './entities/wage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from '../employee/employee.module';
import { WorksiteModule } from '../worksite/worksite.module';
import { MusterModule } from '../muster/muster.module';
import { AdvancesModule } from '../advances/advances.module';
import { FinesModule } from '../fines/fines.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wage]),
    EmployeeModule,
    WorksiteModule,
    MusterModule,
    AdvancesModule,
    FinesModule,
  ],
  controllers: [WagesController],
  providers: [WagesService],
})
export class WagesModule {}
