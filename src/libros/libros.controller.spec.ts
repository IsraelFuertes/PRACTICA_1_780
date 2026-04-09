import { Test, TestingModule } from '@nestjs/testing';
import { LibrosController } from './libros.controller';
import { LibrosService } from './libros.service';

describe('LibrosController', () => {
  let controller: LibrosController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibrosController],
      providers: [
        {
          provide: LibrosService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<LibrosController>(LibrosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
