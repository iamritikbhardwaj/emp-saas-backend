import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusterDto } from './dto/create-muster.dto';
import { UpdateMusterDto } from './dto/update-muster.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Muster } from './entities/muster.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MusterService {
  constructor(
    @InjectRepository(Muster)
    private readonly musterRepository: Repository<Muster>,
  ) {}
  async create(createMusterDto: CreateMusterDto): Promise<Muster> {
    let muster: Muster | null;
    try {
      muster = this.musterRepository.create(createMusterDto);
      muster = await this.musterRepository.save(muster);
    } catch (error) {
      throw new Error('Error creating muster');
    }
    return muster;
  }

  async findAll(take: number, page: number): Promise<[Muster[], number]> {
    let musters: [Muster[], number];
    const skip = (page - 1) * take;
    try {
      musters = await this.musterRepository.findAndCount({
        take,
        skip,
      });
    } catch (error) {
      throw new Error('Error fetching musters');
    }
    return musters;
  }

  async findOne(id: number): Promise<Muster> {
    let muster: Muster | null;
    try {
      muster = await this.musterRepository.findOne({ where: { id } });
      if (muster === null) {
        throw new NotFoundException('Muster not found');
      }
    } catch (error) {
      throw new Error('Error fetching muster');
    }
    return muster;
  }

  async update(id: number, updateMusterDto: UpdateMusterDto): Promise<Muster> {
    let muster: Muster | null;
    try {
      muster = await this.musterRepository.findOne({ where: { id } });
      if (muster === null) {
        throw new NotFoundException('Muster not found');
      }
      Object.assign(muster, updateMusterDto);
      await this.musterRepository.save(muster);
    } catch (error) {
      throw new Error('Error updating muster');
    }
    return muster;
  }

  async remove(id: number): Promise<boolean> {
    let muster: Muster | null;
    try {
      muster = await this.musterRepository.findOne({ where: { id } });
      if (muster === null) {
        throw new NotFoundException('Muster not found');
      }
      await this.musterRepository.remove(muster);
    } catch (error) {
      throw new Error('Error removing muster');
    }
    return true;
  }
}
