import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { AdminUser } from './entities/admin-user.entity';
import { ContractorService } from '../contractor/contractor.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LoginContractorDto } from './dto/login-contractor.dto';

@Injectable()
export class AuthService {
  private readonly jwtSecret =
    process.env.JWT_SECRET || 'default_jwt_secret_change_me';

  constructor(
    @InjectRepository(AdminUser)
    private readonly adminRepository: Repository<AdminUser>,
    private readonly contractorService: ContractorService,
  ) {}

  async createAdmin(
    createAdminDto: CreateAdminDto,
  ): Promise<Omit<AdminUser, 'password'>> {
    const existing = await this.adminRepository.findOne({
      where: { email: createAdminDto.email },
    });
    if (existing) {
      throw new ConflictException('Admin user with this email already exists');
    }

    const admin = this.adminRepository.create({
      name: createAdminDto.name,
      email: createAdminDto.email,
      password: this.hashPassword(createAdminDto.password),
    });

    const saved = await this.adminRepository.save(admin);
    const { password, ...result } = saved;
    return result;
  }

  async loginAdmin(loginAdminDto: LoginAdminDto) {
    const admin = await this.adminRepository.findOne({
      where: { email: loginAdminDto.email },
    });

    if (
      !admin ||
      !this.comparePassword(loginAdminDto.password, admin.password)
    ) {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    return {
      accessToken: this.createJwtToken({
        sub: admin.id,
        email: admin.email,
        role: 'admin',
      }),
    };
  }

  async loginContractor(loginContractorDto: LoginContractorDto) {
    const contractor = await this.contractorService.findByEmail(
      loginContractorDto.email,
    );

    if (
      !contractor ||
      !contractor.password ||
      !this.comparePassword(loginContractorDto.password, contractor.password)
    ) {
      throw new UnauthorizedException('Invalid contractor credentials');
    }

    return {
      accessToken: this.createJwtToken({
        sub: contractor.id,
        email: contractor.email,
        role: 'contractor',
      }),
      contractorId: contractor.id,
    };
  }

  private createJwtToken(payload: Record<string, unknown>): string {
    const header = this.base64UrlEncode(
      JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
    );
    const now = Math.floor(Date.now() / 1000);
    const body = this.base64UrlEncode(
      JSON.stringify({
        ...payload,
        iat: now,
        exp: now + 60 * 60,
      }),
    );

    const signature = this.base64UrlEncode(
      crypto
        .createHmac('sha256', this.jwtSecret)
        .update(`${header}.${body}`)
        .digest('base64'),
    );

    return `${header}.${body}.${signature}`;
  }

  private hashPassword(password: string): string {
    return crypto
      .createHmac('sha256', this.jwtSecret)
      .update(password)
      .digest('hex');
  }

  private comparePassword(password: string, hashedPassword: string): boolean {
    return this.hashPassword(password) === hashedPassword;
  }

  private base64UrlEncode(value: string): string {
    return Buffer.from(value)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
}
