import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { StatutoryService } from './statutory.service';
import { GenerateReportDto } from './dto/generate-report.dto';

@Controller('statutory')
export class StatutoryController {
  constructor(private readonly statutoryService: StatutoryService) {}

  @Post('report')
  async generateReport(
    @Body() dto: GenerateReportDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const buffer = await this.statutoryService.generateReport(dto);
    const filename = `${dto.formType}_${dto.contractorInfo?.name || 'report'}_${dto.month}_${dto.year}.xlsx`;

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    const uint8Buffer = new Uint8Array(
      buffer.buffer,
      buffer.byteOffset,
      buffer.byteLength,
    );

    return new StreamableFile(uint8Buffer);
  }

  @Get('report-data')
  async getReportData(
    @Query('contractorId') contractorId: string,
    @Query('formType') formType: string,
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    return await this.statutoryService.getReportData(
      contractorId,
      formType as any,
      month,
      year,
    );
  }
}
