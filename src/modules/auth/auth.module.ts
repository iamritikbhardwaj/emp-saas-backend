import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminUser } from './entities/admin-user.entity';
import { ContractorModule } from '../contractor/contractor.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser]), ContractorModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
