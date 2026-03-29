import { Injectable } from '@nestjs/common';
import { CreateWorksiteDto } from './dto/create-worksite.dto';
import { UpdateWorksiteDto } from './dto/update-worksite.dto';

@Injectable()
export class WorksiteService {
  create(createWorksiteDto: CreateWorksiteDto) {
    return 'This action adds a new worksite';
  }

  findAll() {
    return `This action returns all worksite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} worksite`;
  }

  update(id: number, updateWorksiteDto: UpdateWorksiteDto) {
    return `This action updates a #${id} worksite`;
  }

  remove(id: number) {
    return `This action removes a #${id} worksite`;
  }
}
