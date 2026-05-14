import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePrincipalEmployerDto } from './dto/create-principal-employer.dto';
import { UpdatePrincipalEmployerDto } from './dto/update-principal-employer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PrincipalEmployer } from './entities/principal-employer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrincipalEmployerService {
  constructor(
    @InjectRepository(PrincipalEmployer)
    private readonly principalEmployerRepository: Repository<PrincipalEmployer>,
  ) {}
  async create(
    createPrincipalEmployerDto: CreatePrincipalEmployerDto,
  ): Promise<PrincipalEmployer> {
    let principalEmployer: PrincipalEmployer | null;
    const existingPrincipalEmployer =
      await this.principalEmployerRepository.findOne({
        where: { name: createPrincipalEmployerDto.name },
      });
    if (existingPrincipalEmployer) {
      throw new ConflictException(
        'PrincipalEmployer with this name already exists',
      );
    }
    try {
      principalEmployer = this.principalEmployerRepository.create(
        createPrincipalEmployerDto,
      );
      principalEmployer =
        await this.principalEmployerRepository.save(principalEmployer);
    } catch (error) {
      throw new Error('Error creating principalEmployer');
    }
    return principalEmployer;
  }

  async findAll(
    take: number,
    page: number,
  ): Promise<[PrincipalEmployer[], number]> {
    let principalEmployers: [PrincipalEmployer[], number];
    const skip = (page - 1) * take;
    try {
      principalEmployers = await this.principalEmployerRepository.findAndCount({
        take,
        skip,
      });
    } catch (error) {
      throw new Error('Error fetching principalEmployers');
    }
    return principalEmployers;
  }

  async findOne(id: number): Promise<PrincipalEmployer> {
    let principalEmployer: PrincipalEmployer | null;
    try {
      principalEmployer = await this.principalEmployerRepository.findOne({
        where: { id },
      });
      if (principalEmployer === null) {
        throw new NotFoundException('PrincipalEmployer not found');
      }
    } catch (error) {
      throw new Error('Error fetching principalEmployer');
    }
    return principalEmployer;
  }

  async update(
    id: number,
    updatePrincipalEmployerDto: UpdatePrincipalEmployerDto,
  ): Promise<PrincipalEmployer> {
    let principalEmployer: PrincipalEmployer | null;
    try {
      principalEmployer = await this.principalEmployerRepository.findOne({
        where: { id },
      });
      if (principalEmployer === null) {
        throw new NotFoundException('PrincipalEmployer not found');
      }
      Object.assign(principalEmployer, updatePrincipalEmployerDto);
      await this.principalEmployerRepository.save(principalEmployer);
    } catch (error) {
      throw new Error('Error updating principalEmployer');
    }
    return principalEmployer;
  }

  async remove(id: number): Promise<boolean> {
    let principalEmployer: PrincipalEmployer | null;
    try {
      principalEmployer = await this.principalEmployerRepository.findOne({
        where: { id },
      });
      if (principalEmployer === null) {
        throw new NotFoundException('PrincipalEmployer not found');
      }
      await this.principalEmployerRepository.remove(principalEmployer);
    } catch (error) {
      throw new Error('Error removing principalEmployer');
    }
    return true;
  }
}
