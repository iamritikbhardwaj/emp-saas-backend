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
import { FinesService } from './fines.service';
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';

@Controller('fines')
export class FinesController {
  constructor(private readonly finesService: FinesService) {}

  @Post()
  create(@Body() createFineDto: CreateFineDto) {
    return this.finesService.create(createFineDto);
  }

  @Get()
  findAll(@Query('take') take: number, @Query('page') page: number) {
    return this.finesService.findAll(take, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.finesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFineDto: UpdateFineDto) {
    return this.finesService.update(+id, updateFineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.finesService.remove(+id);
  }
}
