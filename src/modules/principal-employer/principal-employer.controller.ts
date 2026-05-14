import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PrincipalEmployerService } from './principal-employer.service';
import { CreatePrincipalEmployerDto } from './dto/create-principal-employer.dto';
import { UpdatePrincipalEmployerDto } from './dto/update-principal-employer.dto';

@Controller('principal-employer')
export class PrincipalEmployerController {
  constructor(
    private readonly principalEmployerService: PrincipalEmployerService,
  ) {}

  @Post()
  create(@Body() createPrincipalEmployerDto: CreatePrincipalEmployerDto) {
    return this.principalEmployerService.create(createPrincipalEmployerDto);
  }

  @Get()
  findAll(@Query('take') take: number, @Query('page') page: number) {
    return this.principalEmployerService.findAll(take, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.principalEmployerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePrincipalEmployerDto: UpdatePrincipalEmployerDto,
  ) {
    return this.principalEmployerService.update(
      +id,
      updatePrincipalEmployerDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.principalEmployerService.remove(+id);
  }
}
