import { Module } from '@nestjs/common';
import { FinesService } from './fines.service';
import { FinesController } from './fines.controller';
import { Fine } from './entities/fine.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [TypeOrmModule.forFeature([Fine]), EmployeeModule],
  controllers: [FinesController],
  providers: [FinesService],
})
export class FinesModule {}
