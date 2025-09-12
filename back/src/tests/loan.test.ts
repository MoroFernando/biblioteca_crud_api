import request from 'supertest';
import app from '../app';
import { prisma } from '../prisma/client';
import { Member, Book } from '@prisma/client';

describe('Loans API', () => {
  let book: Book;
  let member: Member;

  beforeAll(async () => {
    const author = await prisma.author.create({
      data: { name: 'J.K. Rowling', birthYear: 1965 },
    });
    const category = await prisma.category.create({ data: { name: 'Fantasia' } });
    book = await prisma.book.create({
      data: {
        title: 'Harry Potter e a Pedra Filosofal',
        isbn: '978-8532511010',
        publicationYear: 1997,
        authorId: author.id,
        categoryId: category.id,
      },
    });
    member = await prisma.member.create({
      data: {
        name: 'Ana Costa',
        email: 'ana.costa@example.com',
        phone: '41911112222',
      },
    });
  });

  beforeEach(async () => {
    await prisma.loan.deleteMany({});
  });

  afterAll(async () => {
    await prisma.loan.deleteMany({});
    await prisma.book.deleteMany({});
    await prisma.author.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.member.deleteMany({});
    await prisma.$disconnect();
  });

  it('should create a new loan', async () => {
    const response = await request(app)
      .post('/loans')
      .send({
        bookId: book.id,
        memberId: member.id,
      });

    expect(response.status).toBe(201);
    expect(response.body.bookId).toBe(book.id);
    expect(response.body.memberId).toBe(member.id);
    expect(response.body.returned).toBe(false);
  });

  it('should update a loan to mark as returned', async () => {
    const loan = await prisma.loan.create({
      data: {
        bookId: book.id,
        memberId: member.id,
      },
    });

    const response = await request(app)
      .put(`/loans/${loan.id}`)
      .send({
        returned: true,
        returnDate: new Date().toISOString(),
      });

    expect(response.status).toBe(200);
    expect(response.body.returned).toBe(true);
  });
});