import request from 'supertest';
import app from '../app';
import { prisma } from '../prisma/client';
import { Author, Category } from '@prisma/client';

describe('Books API', () => {
  let author: Author;
  let category: Category;

  beforeAll(async () => {
    author = await prisma.author.create({
      data: { name: 'George Orwell', birthYear: 1903 },
    });
    category = await prisma.category.create({ data: { name: 'Distopia' } });
  });

  beforeEach(async () => {
    await prisma.loan.deleteMany({});
    await prisma.book.deleteMany({});
  });

  afterAll(async () => {
    await prisma.loan.deleteMany({});
    await prisma.book.deleteMany({});
    await prisma.author.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.$disconnect();
  });

  it('should create a new book', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        title: '1984',
        isbn: '978-0451524935',
        publicationYear: 1949,
        authorId: author.id,
        categoryId: category.id,
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('1984');
  });

  it('should get all books', async () => {
    await prisma.book.create({
      data: {
        title: 'A Revolução dos Bichos',
        isbn: '978-8535902772',
        publicationYear: 1945,
        authorId: author.id,
        categoryId: category.id,
      },
    });

    const response = await request(app).get('/books');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe('A Revolução dos Bichos');
    expect(response.body[0].author.name).toBe('George Orwell');
  });
});