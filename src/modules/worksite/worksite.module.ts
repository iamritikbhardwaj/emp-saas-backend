import { Module } from '@nestjs/common';
import { WorksiteService } from './worksite.service';
import { WorksiteController } from './worksite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Worksite } from './entities/worksite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Worksite])],
  controllers: [WorksiteController],
  providers: [WorksiteService],
})
export class WorksiteModule {}
