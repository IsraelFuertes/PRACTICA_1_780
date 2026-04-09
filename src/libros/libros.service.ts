import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './entities/libro.entity';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Injectable()
export class LibrosService {

  constructor(
    @InjectRepository(Libro)
    private libroRepo: Repository<Libro>,
  ) {}

  create(dto: CreateLibroDto) {
    const libro = this.libroRepo.create(dto);
    return this.libroRepo.save(libro);
  }

  findAll() {
    return this.libroRepo.find();
  }

  async findOne(id: number) {
    const libro = await this.libroRepo.findOneBy({ id });
    if (!libro) throw new NotFoundException('Libro no encontrado');
    return libro;
  }

  async update(id: number, dto: UpdateLibroDto) {
    const libro = await this.findOne(id);
    Object.assign(libro, dto);
    return this.libroRepo.save(libro);
  }

  async remove(id: number) {
    const libro = await this.findOne(id);
    return this.libroRepo.remove(libro);
  }
}