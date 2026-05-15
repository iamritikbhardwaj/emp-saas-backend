import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { join } from 'path';
import * as ExcelJS from 'exceljs';
import { Contractor } from '../contractor/entities/contractor.entity';
import { Employee } from '../employee/entities/employee.entity';
import { Wage } from '../wages/entities/wage.entity';
import { Deduction } from '../wages/entities/deduction.entity';
import { Advance } from '../advances/entities/advance.entity';
import { Muster } from '../muster/entities/muster.entity';
import { GenerateReportDto, FormType } from './dto/generate-report.dto';

const TEMPLATE_MAP: Record<FormType, string> = {
  [FormType.FORM_XIII]: 'form xiii',
  [FormType.FORM_XIV]: 'form xiv emp card',
  [FormType.FORM_XVI]: 'form xiii',
  [FormType.FORM_XVII]: 'wages sheet form xvii',
  [FormType.FORM_XIX]: 'form xix wage slip',
  [FormType.FORM_XX]: 'form xx',
  [FormType.FORM_XXI]: 'form xxi',
  [FormType.FORM_XXII]: 'form xxii',
  [FormType.FORM_XXIII]: 'over time form xxiii',
};

@Injectable()
export class StatutoryService {
  constructor(
    @InjectRepository(Contractor)
    private contractorRepository: Repository<Contractor>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Wage)
    private wageRepository: Repository<Wage>,
    @InjectRepository(Deduction)
    private deductionRepository: Repository<Deduction>,
    @InjectRepository(Advance)
    private advanceRepository: Repository<Advance>,
    @InjectRepository(Muster)
    private musterRepository: Repository<Muster>,
  ) { }

  private getTemplateDirectory(): string {
    return join(process.cwd(), 'src', 'templates', 'excel-sheets');
  }

  async generateReport(
    dto: GenerateReportDto,
  ): Promise<Buffer<ArrayBufferLike>> {
    const templateName = TEMPLATE_MAP[dto.formType];
    if (!templateName) {
      throw new Error(`Unsupported form type: ${dto.formType}`);
    }

    const templatePath = join(
      this.getTemplateDirectory(),
      `${templateName}.xlsx`,
    );
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(templatePath);

    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) {
      throw new Error(`Template worksheet not found for ${templateName}`);
    }

    this.fillFields(worksheet, dto.contractorInfo);
    await this.fillRows(worksheet, dto);

    return (await workbook.xlsx.writeBuffer()) as unknown as Buffer<ArrayBufferLike>;
  }

  private fillFields(
    worksheet: ExcelJS.Worksheet,
    contractorInfo: Record<string, any>,
  ) {
    const fieldMap: Record<string, ExcelJS.CellValue> = {
      C5: contractorInfo.name ?? '',
      C6: contractorInfo.address ?? '',
      C7: contractorInfo.workLocation ?? '',
      C8: contractorInfo.principalEmployer ?? '',
      C9: contractorInfo.principalEmployerAddress ?? '',
    };

    Object.entries(fieldMap).forEach(([cellAddress, value]) => {
      const cell = worksheet.getCell(cellAddress);
      cell.value = value;
    });
  }

  private clearWorksheetRange(
    worksheet: ExcelJS.Worksheet,
    startRow: number,
    endRow: number,
    startCol: number,
    endCol: number,
  ) {
    for (let row = startRow; row <= endRow; row += 1) {
      for (let col = startCol; col <= endCol; col += 1) {
        const cell = worksheet.getCell(row, col);
        cell.value = null;
      }
    }
  }

  private async fillRows(worksheet: ExcelJS.Worksheet, dto: GenerateReportDto) {
    const rows = await this.getDataForForm(dto);
    if (!rows || rows.length === 0) {
      return;
    }

    this.clearWorksheetRange(worksheet, 15, 80, 1, 30);

    const origin = worksheet.getCell('A15');
    const startRow = origin.row;
    const startCol = origin.col;

    rows.forEach((rowData, rowIndex) => {
      const values = Object.values(rowData) as ExcelJS.CellValue[];
      values.forEach((value, columnIndex) => {
        const cell = worksheet.getCell(
          startRow + rowIndex,
          startCol + columnIndex,
        );
        cell.value = value ?? '';
      });
    });
  }

  private async getDataForForm(dto: GenerateReportDto): Promise<any[]> {
    const contractorId = dto.contractorInfo.id;

    switch (dto.formType) {
      case FormType.FORM_XIII:
      case FormType.FORM_XIV:
        return await this.getWorkerData(contractorId);
      case FormType.FORM_XVI:
        return await this.getAttendanceData(contractorId, dto.month, dto.year);
      case FormType.FORM_XVII:
      case FormType.FORM_XIX:
        return await this.getWageData(contractorId, dto.month, dto.year);
      default:
        return [];
    }
  }

  async getReportData(
    contractorId: string,
    formType: FormType,
    month: string,
    year: string,
  ): Promise<any> {
    const contractor = await this.contractorRepository.findOne({
      where: { id: contractorId },
    });
    if (!contractor) {
      throw new Error('Contractor not found');
    }

    const contractorInfo = {
      id: contractor.id,
      name: contractor.companyName,
      address: `${contractor.addressLine1}${contractor.addressLine2 ? ', ' + contractor.addressLine2 : ''}, ${contractor.city}, ${contractor.state} - ${contractor.pincode}`,
      workLocation: contractor.workLocation || contractor.addressLine1,
      principalEmployer: contractor.principalEmployer || '',
      principalEmployerAddress: contractor.principalEmployerAddress || '',
      establishmentName: contractor.establishmentName || contractor.companyName,
      establishmentAddress:
        contractor.establishmentAddress ||
        `${contractor.addressLine1}${contractor.addressLine2 ? ', ' + contractor.addressLine2 : ''}, ${contractor.city}, ${contractor.state} - ${contractor.pincode}`,
    };

    const data = await this.getDataForForm({
      contractorInfo,
      formType,
      month,
      year,
    });

    return {
      contractorInfo,
      month,
      year,
      formType,
      data,
    };
  }

  private async getWorkerData(contractorId: string): Promise<any[]> {
    const employees = await this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.employments', 'employment')
      .leftJoin('employment.worksite', 'worksite')
      .where('worksite.contractorId = :contractorId', { contractorId })
      .getMany();

    return employees.map((emp, index) => ({
      slNo: index + 1,
      empCode: emp.id,
      name: emp.name,
      fatherName: emp.fatherName,
      age: emp.dob ? new Date().getFullYear() - emp.dob.getFullYear() : '',
      dateOfBirth: emp.dob?.toISOString().split('T')[0] || '',
      sex: emp.gender,
      designation: emp.employments[0]?.workNature || '',
      uan: emp.uan || '',
      esic: emp.esic || '',
      permanentAddress: emp.permanentAddress || '',
      presentAddress: emp.presentAddress || '',
      dateOfCommencement:
        emp.employments[0]?.fromDate?.toISOString().split('T')[0] || '',
      dateOfTermination:
        emp.employments[0]?.toDate?.toISOString().split('T')[0] || '',
      remarks: '',
    }));
  }

  private async getWageData(
    contractorId: string,
    month: string,
    year: string,
  ): Promise<any[]> {
    const wages = await this.wageRepository.find({
      relations: ['employee', 'worksite'],
      where: {
        worksite: { contractor: { id: contractorId } },
        month: `${year}-${month.padStart(2, '0')}`,
      },
    });

    const wageData = await Promise.all(
      wages.map(async (wage, index) => {
        // Fetch deductions for this employee and month
        const startOfMonth = new Date(`${year}-${month.padStart(2, '0')}-01`);
        const endOfMonth = new Date(
          startOfMonth.getFullYear(),
          startOfMonth.getMonth() + 1,
          0,
        );

        const deductions = await this.deductionRepository.find({
          where: {
            employee: { id: wage.employee.id },
            date: Between(startOfMonth, endOfMonth),
          },
        });

        // Fetch advances for this employee
        const advances = await this.advanceRepository.find({
          where: {
            employee: { id: wage.employee.id },
          },
        });

        const pfDeduction =
          deductions.find((d) => d.type === 'PF')?.amount || 0;
        const esiDeduction =
          deductions.find((d) => d.type === 'ESI')?.amount || 0;
        const totalDeductions =
          pfDeduction +
          esiDeduction +
          advances.reduce((sum, adv) => sum + adv.amount, 0);

        return {
          slNo: index + 1,
          empCode: wage.employee.id,
          name: wage.employee.name,
          fatherName: wage.employee.fatherName,
          daysWorked: wage.totalDaysWorked,
          totalDays: 30, // Assuming 30 days
          basicWage: wage.basicWages,
          da: 0, // Need to add if available
          hra: 0,
          otherAllowances: 0,
          grossWages: wage.grossWages,
          pf: pfDeduction,
          esi: esiDeduction,
          otherDeductions: advances.reduce((sum, adv) => sum + adv.amount, 0),
          totalDeductions,
          netAmount: wage.netWages,
          overtimeHours: 0,
          overtimeWages: wage.overtimeWages,
        };
      }),
    );

    return wageData;
  }

  private async getAttendanceData(
    contractorId: string,
    month: string,
    year: string,
  ): Promise<any[]> {
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0,
    );

    const musters = await this.musterRepository.find({
      relations: ['employee', 'employee.employments', 'worksite'],
      where: {
        worksite: { contractor: { id: contractorId } },
        date: Between(startDate, endDate),
      },
    });

    // Group by employee and calculate total days worked
    const attendanceMap = new Map<string, any>();
    musters.forEach((muster) => {
      const empId = muster.employee.id;
      if (!attendanceMap.has(empId)) {
        attendanceMap.set(empId, {
          empCode: empId,
          name: muster.employee.name,
          fatherName: muster.employee.fatherName,
          designation: muster.employee.employments[0]?.workNature || '',
          attendance: [],
          totalDaysWorked: 0,
        });
      }
      const empData = attendanceMap.get(empId);
      empData.attendance.push({
        date: muster.date.toISOString().split('T')[0],
        present: muster.present,
        unitsWorked: muster.unitsWorked,
      });
      if (muster.present) {
        empData.totalDaysWorked += 1;
      }
    });

    return Array.from(attendanceMap.values());
  }
}
