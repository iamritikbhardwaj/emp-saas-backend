import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { ContractorModule } from './modules/contractor/contractor.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { EmploymentModule } from './modules/employment/employment.module';
import { FinesModule } from './modules/fines/fines.module';
import { WagesModule } from './modules/wages/wages.module';
import { AdvancesModule } from './modules/advances/advances.module';
import { MusterModule } from './modules/muster/muster.module';
import { StatutoryModule } from './modules/statutory/statutory.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ContractorModule,
    EmployeeModule,
    EmploymentModule,
    FinesModule,
    WagesModule,
    AdvancesModule,
    MusterModule,
    StatutoryModule,
    FinesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
