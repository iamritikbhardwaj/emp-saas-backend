import { Module } from '@nestjs/common';
import { PrincipalEmployerService } from './principal-employer.service';
import { PrincipalEmployerController } from './principal-employer.controller';

@Module({
  controllers: [PrincipalEmployerController],
  providers: [PrincipalEmployerService],
})
export class PrincipalEmployerModule {}
