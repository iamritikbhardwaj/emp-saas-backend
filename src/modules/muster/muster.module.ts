import { Module } from '@nestjs/common';
import { MusterService } from './muster.service';
import { MusterController } from './muster.controller';
import { EmploymentModule } from '../employment/employment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Muster } from './entities/muster.entity';
import { EmployeeModule } from '../employee/employee.module';
import { WorksiteModule } from '../worksite/worksite.module';

@Module({
  imports: [TypeOrmModule.forFeature([Muster]), EmployeeModule, WorksiteModule],
  controllers: [MusterController],
  providers: [MusterService],
})
export class MusterModule {}
