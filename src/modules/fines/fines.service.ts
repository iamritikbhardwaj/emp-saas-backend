import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fine } from './entities/fine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FinesService {
  constructor(
    @InjectRepository(Fine)
    private readonly fineRepository: Repository<Fine>,
  ) {}
  async create(createFineDto: CreateFineDto): Promise<Fine> {
    let fine: Fine | null;
    try {
      fine = this.fineRepository.create(createFineDto);
      fine = await this.fineRepository.save(fine);
    } catch (error) {
      throw new Error('Error creating fine');
    }
    return fine;
  }

  async findAll(take: number, page: number): Promise<[Fine[], number]> {
    let fines: [Fine[], number];
    const skip = (page - 1) * take;
    try {
      fines = await this.fineRepository.findAndCount({
        take,
        skip,
      });
    } catch (error) {
      throw new Error('Error fetching fines');
    }
    return fines;
  }

  async findOne(id: number): Promise<Fine> {
    let fine: Fine | null;
    try {
      fine = await this.fineRepository.findOne({ where: { id } });
      if (fine === null) {
        throw new NotFoundException('Fine not found');
      }
    } catch (error) {
      throw new Error('Error fetching fine');
    }
    return fine;
  }

  async update(id: number, updateFineDto: UpdateFineDto): Promise<Fine> {
    let fine: Fine | null;
    try {
      fine = await this.fineRepository.findOne({ where: { id } });
      if (fine === null) {
        throw new NotFoundException('Fine not found');
      }
      Object.assign(fine, updateFineDto);
      await this.fineRepository.save(fine);
    } catch (error) {
      throw new Error('Error updating fine');
    }
    return fine;
  }

  async remove(id: number): Promise<boolean> {
    let fine: Fine | null;
    try {
      fine = await this.fineRepository.findOne({ where: { id } });
      if (fine === null) {
        throw new NotFoundException('Fine not found');
      }
      await this.fineRepository.remove(fine);
    } catch (error) {
      throw new Error('Error removing fine');
    }
    return true;
  }
}
