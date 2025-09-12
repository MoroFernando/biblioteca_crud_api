import request from 'supertest';
import { prisma } from '../prisma/client';
import app from '../app';

describe('Authors', () => {
  beforeEach(async () => {
    await prisma.book.deleteMany({});
    await prisma.author.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new author', async () => {
    const response = await request(app)
      .post('/authors')
      .send({
        name: 'J.R.R. Tolkien',
        birthYear: 1892,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('J.R.R. Tolkien');
  });

  it('should get all authors', async () => {
    await prisma.author.create({
      data: {
        name: 'George Orwell',
        birthYear: 1903,
      },
    });

    const response = await request(app).get('/authors');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('George Orwell');
  });

  it('should get an author by ID', async () => {
    const author = await prisma.author.create({
      data: {
        name: 'Machado de Assis',
        birthYear: 1839,
      },
    });

    const response = await request(app).get(`/authors/${author.id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Machado de Assis');
  });

  it('should update an author', async () => {
    const author = await prisma.author.create({
      data: {
        name: 'Clarice Lispector',
        birthYear: 1920,
      },
    });

    const response = await request(app)
      .put(`/authors/${author.id}`)
      .send({
        name: 'Clarice Lispector (Atualizado)',
        birthYear: 1920,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Clarice Lispector (Atualizado)');
  });

  it('should delete an author', async () => {
    const author = await prisma.author.create({
      data: {
        name: 'Isaac Asimov',
        birthYear: 1920,
      },
    });

    const response = await request(app).delete(`/authors/${author.id}`);

    expect(response.status).toBe(204);

    const findAuthor = await prisma.author.findUnique({
      where: { id: author.id },
    });
    expect(findAuthor).toBeNull();
  });
});