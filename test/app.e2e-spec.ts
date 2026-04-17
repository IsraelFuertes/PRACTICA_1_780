import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Libro } from '../src/libros/entities/libro.entity';
import { Repository } from 'typeorm';

describe('Libros E2E', () => {
  let app: INestApplication;
  let repo: Repository<Libro>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    repo = moduleFixture.get(getRepositoryToken(Libro));
  });

  beforeEach(async () => {
    await repo.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  // 1
  it('POST válido → 201', async () => {
    const res = await request(app.getHttpServer()).post('/libros').send({
      titulo: 'Libro',
      autor: 'Autor',
      anio: 2024,
      leido: true,
    });
    expect(res.status).toBe(201);
  });

  // 2
  it('POST sin título → 400', async () => {
    const res = await request(app.getHttpServer()).post('/libros').send({
      autor: 'Autor',
      anio: 2024,
      leido: true,
    });
    expect(res.status).toBe(400);
  });

  // 3
  it('POST sin autor → 400', async () => {
    const res = await request(app.getHttpServer()).post('/libros').send({
      titulo: 'Libro',
      anio: 2024,
      leido: true,
    });
    expect(res.status).toBe(400);
  });

  // 4
  it('POST con año negativo → 400', async () => {
    const res = await request(app.getHttpServer()).post('/libros').send({
      titulo: 'Libro',
      autor: 'Autor',
      anio: -1,
      leido: true,
    });
    expect(res.status).toBe(400);
  });

  // 5
  it('GET con datos → 200', async () => {
    await request(app.getHttpServer()).post('/libros').send({
      titulo: 'Libro',
      autor: 'Autor',
      anio: 2024,
      leido: true,
    });

    const res = await request(app.getHttpServer()).get('/libros');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // 6
  it('GET vacío → 200 []', async () => {
    const res = await request(app.getHttpServer()).get('/libros');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  // 7
  it('GET por id válido → 200', async () => {
    const create = await request(app.getHttpServer()).post('/libros').send({
      titulo: 'Libro',
      autor: 'Autor',
      anio: 2024,
      leido: true,
    });

    const res = await request(app.getHttpServer()).get(`/libros/${create.body.id}`);
    expect(res.status).toBe(200);
  });

  // 8
  it('GET por id inexistente → 404', async () => {
    const res = await request(app.getHttpServer()).get('/libros/999');
    expect(res.status).toBe(404);
  });

  // 9
  it('GET por id inválido → 400', async () => {
    const res = await request(app.getHttpServer()).get('/libros/abc');
    expect(res.status).toBe(400);
  });

  // 10
  it('PUT actualizar válido → 200', async () => {
    const create = await request(app.getHttpServer()).post('/libros').send({
      titulo: 'Libro',
      autor: 'Autor',
      anio: 2024,
      leido: true,
    });

    const res = await request(app.getHttpServer())
      .put(`/libros/${create.body.id}`)
      .send({ titulo: 'Nuevo' });

    expect(res.status).toBe(200);
  });

  // 11
  it('PUT id inexistente → 404', async () => {
    const res = await request(app.getHttpServer())
      .put('/libros/999')
      .send({ titulo: 'Nuevo' });

    expect(res.status).toBe(404);
  });

  // 12
  it('PUT datos inválidos → 400', async () => {
    const create = await request(app.getHttpServer()).post('/libros').send({
      titulo: 'Libro',
      autor: 'Autor',
      anio: 2024,
      leido: true,
    });

    const res = await request(app.getHttpServer())
      .put(`/libros/${create.body.id}`)
      .send({ anio: -10 });

    expect(res.status).toBe(400);
  });

  // 13
  it('DELETE válido → 200', async () => {
    const create = await request(app.getHttpServer()).post('/libros').send({
      titulo: 'Libro',
      autor: 'Autor',
      anio: 2024,
      leido: true,
    });

    const res = await request(app.getHttpServer())
      .delete(`/libros/${create.body.id}`);

    expect(res.status).toBe(200);
  });

  // 14
  it('DELETE inexistente → 404', async () => {
    const res = await request(app.getHttpServer())
      .delete('/libros/999');

    expect(res.status).toBe(404);
  });

  // 15 FLUJO COMPLETO
  it('Flujo completo CRUD', async () => {
    const create = await request(app.getHttpServer()).post('/libros').send({
      titulo: 'Libro',
      autor: 'Autor',
      anio: 2024,
      leido: true,
    });

    const id = create.body.id;

    const get = await request(app.getHttpServer()).get(`/libros/${id}`);
    expect(get.status).toBe(200);

    const update = await request(app.getHttpServer())
      .put(`/libros/${id}`)
      .send({ titulo: 'Actualizado' });
    expect(update.status).toBe(200);

    const del = await request(app.getHttpServer())
      .delete(`/libros/${id}`);
    expect(del.status).toBe(200);

    const check = await request(app.getHttpServer()).get(`/libros/${id}`);
    expect(check.status).toBe(404);
  });
});