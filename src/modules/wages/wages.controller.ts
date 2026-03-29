import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WagesService } from './wages.service';
import { CreateWageDto } from './dto/create-wage.dto';
import { UpdateWageDto } from './dto/update-wage.dto';

@Controller('wages')
export class WagesController {
  constructor(private readonly wagesService: WagesService) {}

  @Post()
  create(@Body() createWageDto: CreateWageDto) {
    return this.wagesService.create(createWageDto);
  }

  @Get()
  findAll() {
    return this.wagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWageDto: UpdateWageDto) {
    return this.wagesService.update(+id, updateWageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wagesService.remove(+id);
  }
}
