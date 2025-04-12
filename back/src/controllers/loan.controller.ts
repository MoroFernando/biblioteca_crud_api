import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

// Criar empréstimo
export const createLoan = async (req: Request, res: Response): Promise<any> => {
  const { bookId, memberId, loanDate, returnDate } = req.body;

  try {
    const loan = await prisma.loan.create({
      data: {
        bookId,
        memberId,
        loanDate: loanDate ? new Date(loanDate) : undefined,
        returnDate: returnDate ? new Date(returnDate) : undefined
      }
    });
    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar empréstimo' });
  }
};

// Listar todos os empréstimos
export const getAllLoans = async (_: Request, res: Response): Promise<any> => {
  const loans = await prisma.loan.findMany({
    include: {
      book: true,
      member: true
    }
  });
  res.json(loans);
};

// Buscar empréstimo por ID
export const getLoanById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const loan = await prisma.loan.findUnique({
    where: { id: Number(id) },
    include: {
      book: true,
      member: true
    }
  });

  if (!loan) return res.status(404).json({ error: 'Empréstimo não encontrado' });

  res.json(loan);
};

// Atualizar empréstimo (ex: marcar como devolvido)
export const updateLoan = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { returnDate, returned } = req.body;

  try {
    const loan = await prisma.loan.update({
      where: { id: Number(id) },
      data: {
        returnDate: returnDate ? new Date(returnDate) : undefined,
        returned
      }
    });
    res.json(loan);
  } catch (error) {
    res.status(404).json({ error: 'Erro ao atualizar empréstimo' });
  }
};

// Deletar empréstimo
export const deleteLoan = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    await prisma.loan.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Empréstimo não encontrado' });
  }
};
