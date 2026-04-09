import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Controller('libros')
export class LibrosController {

  constructor(private readonly librosService: LibrosService) {}

  @Post()
  create(@Body() dto: CreateLibroDto) {
    return this.librosService.create(dto);
  }

  @Get()
  findAll() {
    return this.librosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.librosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLibroDto) {
    return this.librosService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.librosService.remove(+id);
  }
}