import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorksiteService } from './worksite.service';
import { CreateWorksiteDto } from './dto/create-worksite.dto';
import { UpdateWorksiteDto } from './dto/update-worksite.dto';

@Controller('worksite')
export class WorksiteController {
  constructor(private readonly worksiteService: WorksiteService) {}

  @Post()
  create(@Body() createWorksiteDto: CreateWorksiteDto) {
    return this.worksiteService.create(createWorksiteDto);
  }

  @Get()
  findAll() {
    return this.worksiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.worksiteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorksiteDto: UpdateWorksiteDto) {
    return this.worksiteService.update(+id, updateWorksiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.worksiteService.remove(+id);
  }
}
