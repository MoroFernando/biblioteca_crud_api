import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

// Criar membro
export const createMember = async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;

  try {
    const member = await prisma.member.create({
      data: { name, email, phone }
    });
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar membro' });
  }
};

// Listar todos os membros
export const getAllMembers = async (_: Request, res: Response) => {
  const members = await prisma.member.findMany({
    include: { loans: true }
  });
  res.json(members);
};

// Buscar membro por ID
export const getMemberById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const member = await prisma.member.findUnique({
    where: { id: Number(id) },
    include: { loans: true }
  });

  if (!member) return res.status(404).json({ error: 'Membro não encontrado' });

  res.json(member);
};

// Atualizar membro
export const updateMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const member = await prisma.member.update({
      where: { id: Number(id) },
      data: { name, email, phone }
    });
    res.json(member);
  } catch (error) {
    res.status(404).json({ error: 'Membro não encontrado ou erro ao atualizar' });
  }
};

// Deletar membro
export const deleteMember = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.member.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Membro não encontrado' });
  }
};
