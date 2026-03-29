import { Injectable } from '@nestjs/common';
import { CreatePrincipalEmployerDto } from './dto/create-principal-employer.dto';
import { UpdatePrincipalEmployerDto } from './dto/update-principal-employer.dto';

@Injectable()
export class PrincipalEmployerService {
  create(createPrincipalEmployerDto: CreatePrincipalEmployerDto) {
    return 'This action adds a new principalEmployer';
  }

  findAll() {
    return `This action returns all principalEmployer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} principalEmployer`;
  }

  update(id: number, updatePrincipalEmployerDto: UpdatePrincipalEmployerDto) {
    return `This action updates a #${id} principalEmployer`;
  }

  remove(id: number) {
    return `This action removes a #${id} principalEmployer`;
  }
}
