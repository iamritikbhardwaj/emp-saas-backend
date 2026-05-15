import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { UpdateContractorDto } from './dto/update-contractor.dto';
import { ILike, Repository } from 'typeorm';
import { Contractor } from './entities/contractor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContractorService {
  constructor(
    @InjectRepository(Contractor)
    private readonly contractorRepository: Repository<Contractor>,
  ) {}
  async create(createContractorDto: CreateContractorDto): Promise<Contractor> {
    let contractor: Contractor | null;
    const existingContractor = await this.contractorRepository.findOne({
      where: { registrationNumber: createContractorDto.registrationNumber },
    });
    if (existingContractor) {
      throw new ConflictException(
        'Contractor with this registration number already exists',
      );
    }
    try {
      contractor = this.contractorRepository.create({
        ...createContractorDto,
        password: createContractorDto.password
          ? this.hashPassword(createContractorDto.password)
          : undefined,
      });
      contractor = await this.contractorRepository.save(contractor);
    } catch (error) {
      throw new Error('Error creating contractor');
    }
    return contractor;
  }

  async findByEmail(email: string): Promise<Contractor | null> {
    return this.contractorRepository.findOne({ where: { email } });
  }

  async findAll(take: number, page: number, searchQuery: string) {
    const skip = (page - 1) * take;
    try {
      const [data, total] = await this.contractorRepository.findAndCount({
        take,
        skip,
        order: { createdAt: 'DESC' },
        where: searchQuery
          ? [
              { companyName: ILike(`%${searchQuery}%`) },
              { city: ILike(`%${searchQuery}%`) },
              { state: ILike(`%${searchQuery}%`) },
            ]
          : {},
      });

      // Map the DB entities to the UI-friendly shape your frontend expects
      const items = data.map((c) => ({
        id: c.id,
        name: c.companyName,
        location: `${c.city}, ${c.state}`,
        totalWorkers: c.estimatedWorkers,
        sitesCount: c.numberOfSites,
        plan: c.subscriptionPlan,
        status: c.status,
        lastUpdate: c.updatedAt,
      }));

      return {
        items, // This is what you will iterate over
        meta: {
          totalItems: total,
          itemCount: items.length,
          itemsPerPage: take,
          totalPages: Math.ceil(total / take),
          currentPage: page,
        },
      };
    } catch (error) {
      throw new Error('Error fetching contractors');
    }
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

      const { password, ...otherFields } = updateContractorDto as {
        password?: string;
      };

      if (password) {
        contractor.password = this.hashPassword(password);
      }

      Object.assign(contractor, otherFields);
      await this.contractorRepository.save(contractor);
    } catch (error) {
      throw new Error('Error updating contractor');
    }
    return contractor;
  }

  private hashPassword(password: string): string {
    return crypto
      .createHmac(
        'sha256',
        process.env.JWT_SECRET || 'default_jwt_secret_change_me',
      )
      .update(password)
      .digest('hex');
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
