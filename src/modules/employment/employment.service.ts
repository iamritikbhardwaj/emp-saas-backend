import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmploymentDto } from './dto/create-employment.dto';
import { UpdateEmploymentDto } from './dto/update-employment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employment } from './entities/employment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmploymentService {
  constructor(
    @InjectRepository(Employment)
    private readonly employmentRepository: Repository<Employment>,
  ) {}
  async create(createEmploymentDto: CreateEmploymentDto): Promise<Employment> {
    let employment: Employment | null;
    try {
      employment = this.employmentRepository.create(createEmploymentDto);
      employment = await this.employmentRepository.save(employment);
    } catch (error) {
      throw new Error('Error creating employment');
    }
    return employment;
  }

  async findAll(take: number, page: number): Promise<[Employment[], number]> {
    let employments: [Employment[], number];
    const skip = (page - 1) * take;
    try {
      employments = await this.employmentRepository.findAndCount({
        take,
        skip,
      });
    } catch (error) {
      throw new Error('Error fetching employments');
    }
    return employments;
  }

  async findOne(id: number): Promise<Employment> {
    let employment: Employment | null;
    try {
      employment = await this.employmentRepository.findOne({ where: { id } });
      if (employment === null) {
        throw new NotFoundException('Employment not found');
      }
    } catch (error) {
      throw new Error('Error fetching employment');
    }
    return employment;
  }

  async update(
    id: number,
    updateEmploymentDto: UpdateEmploymentDto,
  ): Promise<Employment> {
    let employment: Employment | null;
    try {
      employment = await this.employmentRepository.findOne({ where: { id } });
      if (employment === null) {
        throw new NotFoundException('Employment not found');
      }
      Object.assign(employment, updateEmploymentDto);
      await this.employmentRepository.save(employment);
    } catch (error) {
      throw new Error('Error updating employment');
    }
    return employment;
  }

  async remove(id: number): Promise<boolean> {
    let employment: Employment | null;
    try {
      employment = await this.employmentRepository.findOne({ where: { id } });
      if (employment === null) {
        throw new NotFoundException('Employment not found');
      }
      await this.employmentRepository.remove(employment);
    } catch (error) {
      throw new Error('Error removing employment');
    }
    return true;
  }
}
