import { Injectable } from '@nestjs/common';
import { CreateAdvanceDto } from './dto/create-advance.dto';
import { UpdateAdvanceDto } from './dto/update-advance.dto';

@Injectable()
export class AdvancesService {
  create(createAdvanceDto: CreateAdvanceDto) {
    return 'This action adds a new advance';
  }

  findAll() {
    return `This action returns all advances`;
  }

  findOne(id: number) {
    return `This action returns a #${id} advance`;
  }

  update(id: number, updateAdvanceDto: UpdateAdvanceDto) {
    return `This action updates a #${id} advance`;
  }

  remove(id: number) {
    return `This action removes a #${id} advance`;
  }
}
