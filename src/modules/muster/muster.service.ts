import { Injectable } from '@nestjs/common';
import { CreateMusterDto } from './dto/create-muster.dto';
import { UpdateMusterDto } from './dto/update-muster.dto';

@Injectable()
export class MusterService {
  create(createMusterDto: CreateMusterDto) {
    return 'This action adds a new muster';
  }

  findAll() {
    return `This action returns all muster`;
  }

  findOne(id: number) {
    return `This action returns a #${id} muster`;
  }

  update(id: number, updateMusterDto: UpdateMusterDto) {
    return `This action updates a #${id} muster`;
  }

  remove(id: number) {
    return `This action removes a #${id} muster`;
  }
}
