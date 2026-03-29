import { Module } from '@nestjs/common';
import { WorksiteService } from './worksite.service';
import { WorksiteController } from './worksite.controller';

@Module({
  controllers: [WorksiteController],
  providers: [WorksiteService],
})
export class WorksiteModule {}
