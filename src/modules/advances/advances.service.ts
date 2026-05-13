import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdvanceDto } from './dto/create-advance.dto';
import { UpdateAdvanceDto } from './dto/update-advance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Advance } from './entities/advance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdvancesService {
  constructor(
    @InjectRepository(Advance)
    private readonly advanceRepository: Repository<Advance>,
  ) {}
  async create(createAdvanceDto: CreateAdvanceDto): Promise<Advance> {
    let advance: Advance | null;
    const existingAdvance = await this.advanceRepository.findOne({
      where: { purpose: createAdvanceDto.purpose },
    });
    if (existingAdvance) {
      throw new ConflictException('Advance with this purpose already exists');
    }
    try {
      advance = this.advanceRepository.create(createAdvanceDto);
      this.advanceRepository.save(advance);
    } catch (error) {
      throw new Error('Error creating advance');
    }
    return advance;
  }

  async findAll(take: number, page: number): Promise<[Advance[], number]> {
    let advances: [Advance[], number];
    const skip = (page - 1) * take;
    try {
      advances = await this.advanceRepository.findAndCount({
        take,
        skip,
      });
    } catch (error) {
      throw new Error('Error fetching advances');
    }
    return advances;
  }

  async findOne(id: string): Promise<Advance> {
    let advance: Advance | null;
    try {
      advance = await this.advanceRepository.findOne({ where: { id } });
      if (advance === null) {
        throw new NotFoundException('Advance not found');
      }
    } catch (error) {
      throw new Error('Error fetching advance');
    }
    return advance;
  }

  async update(
    id: string,
    updateAdvanceDto: UpdateAdvanceDto,
  ): Promise<Advance> {
    let advance: Advance | null;
    try {
      advance = await this.advanceRepository.findOne({ where: { id } });
      if (advance === null) {
        throw new NotFoundException('Advance not found');
      }
      Object.assign(advance, updateAdvanceDto);
      await this.advanceRepository.save(advance);
    } catch (error) {
      throw new Error('Error updating advance');
    }
    return advance;
  }

  async remove(id: string): Promise<Boolean> {
    let advance: Advance | null;
    try {
      advance = await this.advanceRepository.findOne({ where: { id } });
      if (advance === null) {
        throw new NotFoundException('Advance not found');
      }
      await this.advanceRepository.remove(advance);
    } catch (error) {
      throw new Error('Error removing advance');
    }
    return true;
  }
}
