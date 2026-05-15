import { Body, Controller, Post } from '@nestjs/common';
import { ExcelService } from './excel.service';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('upload')
  async uploadExcel(@Body() body: any) {
    try {
      await this.excelService.processExcelUpload(body);
      return {
        success: true,
        receivedSheets: Array.isArray(body.sheets) ? body.sheets.length : 0,
        fileName: body.fileName,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}
