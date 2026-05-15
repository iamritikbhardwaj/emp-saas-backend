import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contractor } from '../contractor/entities/contractor.entity';
import { Employee } from '../employee/entities/employee.entity';
import { Employment } from '../employment/entities/employment.entity';
import { Worksite } from '../worksite/entities/worksite.entity';
import { Wage } from '../wages/entities/wage.entity';
import { Muster } from '../muster/entities/muster.entity';

@Injectable()
export class ExcelService {
  constructor(
    @InjectRepository(Contractor) private contractorRepo: Repository<Contractor>,
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(Employment) private employmentRepo: Repository<Employment>,
    @InjectRepository(Worksite) private worksiteRepo: Repository<Worksite>,
    @InjectRepository(Wage) private wageRepo: Repository<Wage>,
    @InjectRepository(Muster) private musterRepo: Repository<Muster>,
  ) {}

  async processExcelUpload(payload: any) {
    const { contractorId, month, year, sheets } = payload;
    
    // 1. Find Contractor
    const contractor = await this.contractorRepo.findOne({ 
      where: { id: contractorId }, 
      relations: ['worksites'] 
    });
    if (!contractor) throw new Error('Contractor not found');

    // 2. Find or create a default worksite for this contractor
    let worksite = contractor.worksites && contractor.worksites.length > 0 
      ? contractor.worksites[0] 
      : null;
      
    if (!worksite) {
      worksite = this.worksiteRepo.create({
        name: `${contractor.companyName || 'Default'} Worksite`,
        location: contractor.city || 'Unknown',
        contractor: contractor,
      });
      await this.worksiteRepo.save(worksite);
    }

    const formattedMonth = `${year}-${month}`; // e.g. "2025-12"

    for (const sheet of sheets) {
      if (!sheet.rows || !Array.isArray(sheet.rows)) continue;

      for (const row of sheet.rows) {
        // Find or Create Employee
        const empName = row['Employee Name'] || row['Name'] || row['name'] || row['EMPLOYEE NAME'];
        if (!empName) continue; // Skip rows without name

        let employee = await this.employeeRepo.findOne({ 
          where: { 
            name: empName, 
            fatherName: row['Father Name'] || row['fatherName'] || row['FATHER NAME'] || '' 
          } 
        });

        if (!employee) {
          employee = this.employeeRepo.create({
            name: empName,
            fatherName: row['Father Name'] || row['fatherName'] || row['FATHER NAME'] || 'Unknown',
            gender: row['Gender'] || row['gender'] || row['GENDER'] || 'Male',
            uan: row['UAN'] || row['uan'] || '',
            esic: row['ESIC'] || row['esic'] || '',
          });
          await this.employeeRepo.save(employee);

          // Create Employment record
          const employment = this.employmentRepo.create({
            employee,
            worksite,
            workNature: row['Designation'] || row['designation'] || 'Worker',
            wageRate: parseFloat(row['Wage Rate'] || row['wageRate'] || row['WAGE RATE'] || 0),
            fromDate: new Date(`${year}-${month}-01`),
          });
          await this.employmentRepo.save(employment);
        }

        // Process Wages
        const basic = parseFloat(row['Basic'] || row['basicWages'] || row['BASIC'] || 0);
        const gross = parseFloat(row['Gross'] || row['grossWages'] || row['GROSS'] || 0);
        const net = parseFloat(row['Net'] || row['netWages'] || row['NET'] || 0);
        const ot = parseFloat(row['OT'] || row['overtimeWages'] || 0);
        const daysWorked = parseInt(row['Days Worked'] || row['totalDaysWorked'] || row['DAYS'] || 0);

        if (basic > 0 || gross > 0 || net > 0 || daysWorked > 0) {
          let wage = await this.wageRepo.findOne({
            where: { 
              employee: { id: employee.id }, 
              worksite: { id: worksite.id }, 
              month: formattedMonth 
            }
          });
          
          if (!wage) {
            wage = this.wageRepo.create({
              employee,
              worksite,
              month: formattedMonth,
              basicWages: basic,
              grossWages: gross,
              netWages: net,
              overtimeWages: ot,
              totalDaysWorked: daysWorked
            });
            await this.wageRepo.save(wage);
          } else {
            wage.basicWages = basic;
            wage.grossWages = gross;
            wage.netWages = net;
            wage.overtimeWages = ot;
            wage.totalDaysWorked = daysWorked;
            await this.wageRepo.save(wage);
          }
        }
      }
    }
    
    return { success: true, message: 'Excel data processed successfully' };
  }
}
