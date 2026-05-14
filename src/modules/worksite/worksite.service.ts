import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorksiteDto } from './dto/create-worksite.dto';
import { UpdateWorksiteDto } from './dto/update-worksite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Worksite } from './entities/worksite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorksiteService {
  constructor(
    @InjectRepository(Worksite)
    private readonly worksiteRepository: Repository<Worksite>,
  ) {}
  async create(createWorksiteDto: CreateWorksiteDto): Promise<Worksite> {
    let worksite: Worksite | null;
    const existingWorksite = await this.worksiteRepository.findOne({
      where: { name: createWorksiteDto.name },
    });
    if (existingWorksite) {
      throw new ConflictException('Worksite with this name already exists');
    }
    try {
      worksite = this.worksiteRepository.create(createWorksiteDto);
      worksite = await this.worksiteRepository.save(worksite);
    } catch (error) {
      throw new Error('Error creating worksite');
    }
    return worksite;
  }

  async findAll(take: number, page: number): Promise<[Worksite[], number]> {
    let worksites: [Worksite[], number];
    const skip = (page - 1) * take;
    try {
      worksites = await this.worksiteRepository.findAndCount({
        take,
        skip,
      });
    } catch (error) {
      throw new Error('Error fetching worksites');
    }
    return worksites;
  }

  async findOne(id: string): Promise<Worksite> {
    let worksite: Worksite | null;
    try {
      worksite = await this.worksiteRepository.findOne({ where: { id } });
      if (worksite === null) {
        throw new NotFoundException('Worksite not found');
      }
    } catch (error) {
      throw new Error('Error fetching worksite');
    }
    return worksite;
  }

  async update(
    id: string,
    updateWorksiteDto: UpdateWorksiteDto,
  ): Promise<Worksite> {
    let worksite: Worksite | null;
    try {
      worksite = await this.worksiteRepository.findOne({ where: { id } });
      if (worksite === null) {
        throw new NotFoundException('Worksite not found');
      }
      Object.assign(worksite, updateWorksiteDto);
      await this.worksiteRepository.save(worksite);
    } catch (error) {
      throw new Error('Error updating worksite');
    }
    return worksite;
  }

  async remove(id: string): Promise<boolean> {
    let worksite: Worksite | null;
    try {
      worksite = await this.worksiteRepository.findOne({ where: { id } });
      if (worksite === null) {
        throw new NotFoundException('Worksite not found');
      }
      await this.worksiteRepository.remove(worksite);
    } catch (error) {
      throw new Error('Error removing worksite');
    }
    return true;
  }
}
