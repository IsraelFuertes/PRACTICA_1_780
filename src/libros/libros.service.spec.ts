import { Test, TestingModule } from '@nestjs/testing';
import { LibrosService } from './libros.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';

describe('LibrosService', () => {
  let service: LibrosService;

  const mockRepo = {
    create: jest.fn(dto => dto),
    save: jest.fn(dto => Promise.resolve({ id: 1, ...dto })),
    find: jest.fn(() => Promise.resolve([])),
    findOneBy: jest.fn(({ id }) => Promise.resolve({ id, titulo: 'Test' })),
    remove: jest.fn(dto => Promise.resolve(dto)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibrosService,
        {
          provide: getRepositoryToken(Libro),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<LibrosService>(LibrosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create libro', async () => {
    const dto = { titulo: 'Libro', autor: 'Autor', anio: 2020, leido: true };
    const result = await service.create(dto);
    expect(result).toHaveProperty('id');
  });

  it('findAll libros', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
  });

  it('findOne libro', async () => {
    const result = await service.findOne(1);
    expect(result).toHaveProperty('id');
  });

  it('update libro', async () => {
    const result = await service.update(1, { titulo: 'Nuevo' });
    expect(result).toHaveProperty('titulo');
  });

  it('remove libro', async () => {
    const result = await service.remove(1);
    expect(result).toHaveProperty('id');
  });
});