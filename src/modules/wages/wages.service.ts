import { Injectable } from '@nestjs/common';
import { CreateWageDto } from './dto/create-wage.dto';
import { UpdateWageDto } from './dto/update-wage.dto';
import { CreateDeductionDto } from './dto/create-deduction.dto';
import { CreateWageSlipDto } from './dto/create-wage-slip.dto';

@Injectable()
export class WagesService {
  createWage(createWageDto: CreateWageDto) {
    return 'This action adds a new wage';
  }

  createWageSlip(createWageSlipDto: CreateWageSlipDto) {
    return 'This action adds a new wage slip';
  }

  createDeduction(createDeductionDto: CreateDeductionDto) {
    return 'This action adds a new deduction';
  }

  findAll() {
    return `This action returns all wages`;
  }

  findOne(id: string) {
    return `This action returns a #${id} wage`;
  }

  update(id: string, updateWageDto: UpdateWageDto) {
    return `This action updates a #${id} wage`;
  }

  remove(id: string) {
    return `This action removes a #${id} wage`;
  }
}
