import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { UpdateContractorDto } from './dto/update-contractor.dto';
import { Repository } from 'typeorm';
import { Contractor } from './entities/contractor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContractorService {
  constructor(
    @InjectRepository(Contractor)
    private readonly contractorRepository: Repository<Contractor>,
  ) {}
  async create(createContractorDto: CreateContractorDto): Promise<Contractor> {
    let contractor: Contractor;
    try {
      const existingContractor = await this.contractorRepository.findOne({
        where: { name: createContractorDto.name },
      });
      if (!existingContractor) {
        throw new ConflictException('Contractor with this name already exists');
      }
      contractor = this.contractorRepository.create(createContractorDto);
      await this.contractorRepository.save(contractor);
    } catch (error) {
      throw new Error('Error creating contractor');
    }
    return contractor;
  }

  async findAll(take = 10, page = 1): Promise<[Contractor[], number]> {
    const skip = (page - 1) * take;
    let contractors: [Contractor[], number];
    try {
      contractors = await this.contractorRepository.findAndCount({
        take: take,
        skip: skip,
      });
      if (contractors[1] === 0) {
        throw new NotFoundException('No contractors found');
      }
    } catch (error) {
      throw new Error('Error fetching contractors');
    }
    return contractors;
  }

  async findOne(id: string): Promise<Contractor> {
    let contractor: Contractor | null;
    try {
      contractor = await this.contractorRepository.findOne({ where: { id } });
      if (contractor === null) {
        throw new NotFoundException('Contractor not found');
      }
    } catch (error) {
      throw new Error('Error fetching contractor');
    }
    return contractor;
  }

  async update(
    id: string,
    updateContractorDto: UpdateContractorDto,
  ): Promise<Contractor> {
    let contractor: Contractor | null;
    try {
      contractor = await this.contractorRepository.findOne({ where: { id } });
      if (contractor === null) {
        throw new NotFoundException('Contractor not found');
      }
      Object.assign(contractor, updateContractorDto);
      await this.contractorRepository.save(contractor);
    } catch (error) {
      throw new Error('Error updating contractor');
    }
    return contractor;
  }

  async remove(id: string): Promise<boolean> {
    let contractor: Contractor | null;
    try {
      contractor = await this.contractorRepository.findOne({ where: { id } });
      if (contractor === null) {
        throw new NotFoundException('Contractor not found');
      }
      await this.contractorRepository.remove(contractor);
    } catch (error) {
      throw new Error('Error removing contractor');
    }
    return true;
  }
}
