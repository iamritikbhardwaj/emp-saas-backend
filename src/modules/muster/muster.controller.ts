import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MusterService } from './muster.service';
import { CreateMusterDto } from './dto/create-muster.dto';
import { UpdateMusterDto } from './dto/update-muster.dto';

@Controller('muster')
export class MusterController {
  constructor(private readonly musterService: MusterService) {}

  @Post()
  create(@Body() createMusterDto: CreateMusterDto) {
    return this.musterService.create(createMusterDto);
  }

  @Get()
  findAll() {
    return this.musterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMusterDto: UpdateMusterDto) {
    return this.musterService.update(+id, updateMusterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musterService.remove(+id);
  }
}
