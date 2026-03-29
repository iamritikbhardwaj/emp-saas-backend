import { Module } from '@nestjs/common';
import { AdvancesService } from './advances.service';
import { AdvancesController } from './advances.controller';
import { EmployeeModule } from '../employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advance } from './entities/advance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Advance]), EmployeeModule],
  controllers: [AdvancesController],
  providers: [AdvancesService],
})
export class AdvancesModule {}
