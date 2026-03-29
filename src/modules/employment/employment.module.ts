import { Module } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { EmploymentController } from './employment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employment } from './entities/employment.entity';
import { EmployeeModule } from '../employee/employee.module';
import { WorksiteModule } from '../worksite/worksite.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employment]),
    EmployeeModule,
    WorksiteModule,
  ],
  controllers: [EmploymentController],
  providers: [EmploymentService],
})
export class EmploymentModule {}
