import request from 'supertest';
import app from '../app';
import { prisma } from '../prisma/client';

describe('Members API', () => {
  beforeEach(async () => {
    await prisma.loan.deleteMany({});
    await prisma.member.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new member', async () => {
    const response = await request(app)
      .post('/members')
      .send({
        name: 'João da Silva',
        email: 'joao.silva@example.com',
        phone: '11987654321',
      });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe('joao.silva@example.com');
  });

  it('should get all members', async () => {
    await prisma.member.create({
      data: {
        name: 'Maria Oliveira',
        email: 'maria.oliveira@example.com',
        phone: '21912345678',
      },
    });

    const response = await request(app).get('/members');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('Maria Oliveira');
  });

  it('should not create a member with a duplicate email', async () => {
    await request(app)
      .post('/members')
      .send({
        name: 'Carlos Pereira',
        email: 'carlos.p@example.com',
        phone: '31955554444',
      });

    const response = await request(app)
      .post('/members')
      .send({
        name: 'Carlos Souza',
        email: 'carlos.p@example.com',
        phone: '31966667777',
      });
      
    expect(response.status).toBe(500);
  });
});