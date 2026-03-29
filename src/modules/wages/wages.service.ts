import { Injectable } from '@nestjs/common';
import { CreateWageDto } from './dto/create-wage.dto';
import { UpdateWageDto } from './dto/update-wage.dto';

@Injectable()
export class WagesService {
  create(createWageDto: CreateWageDto) {
    return 'This action adds a new wage';
  }

  findAll() {
    return `This action returns all wages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wage`;
  }

  update(id: number, updateWageDto: UpdateWageDto) {
    return `This action updates a #${id} wage`;
  }

  remove(id: number) {
    return `This action removes a #${id} wage`;
  }
}
