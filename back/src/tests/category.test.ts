import request from 'supertest';
import app from '../app';
import { prisma } from '../prisma/client';

describe('Categories API', () => {
  beforeEach(async () => {
    await prisma.book.deleteMany({});
    await prisma.category.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .send({ name: 'Ficção Científica' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Ficção Científica');
  });

  it('should get all categories', async () => {
    await prisma.category.create({ data: { name: 'Aventura' } });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('Aventura');
  });

  it('should get a category by ID', async () => {
    const category = await prisma.category.create({ data: { name: 'Romance' } });

    const response = await request(app).get(`/categories/${category.id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Romance');
  });

  it('should update a category', async () => {
    const category = await prisma.category.create({ data: { name: 'Biografia' } });

    const response = await request(app)
      .put(`/categories/${category.id}`)
      .send({ name: 'História' });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('História');
  });

  it('should delete a category', async () => {
    const category = await prisma.category.create({ data: { name: 'Suspense' } });

    const response = await request(app).delete(`/categories/${category.id}`);
    expect(response.status).toBe(204);

    const findCategory = await prisma.category.findUnique({ where: { id: category.id } });
    expect(findCategory).toBeNull();
  });
});