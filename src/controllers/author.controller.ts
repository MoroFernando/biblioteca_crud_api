import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

// Criar autor
export const createAuthor = async (req: Request, res: Response) => {
  const { name, birthYear } = req.body;

  try {
    const author = await prisma.author.create({
      data: { name, birthYear }
    });
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar autor' });
  }
};

// Listar todos os autores
export const getAllAuthors = async (_: Request, res: Response) => {
  const authors = await prisma.author.findMany({
    include: { books: true }
  });
  res.json(authors);
};

// Buscar autor por ID
export const getAuthorById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const author = await prisma.author.findUnique({
    where: { id: Number(id) },
    include: { books: true }
  });

  if (!author) return res.status(404).json({ error: 'Autor não encontrado' });

  res.json(author);
};

// Atualizar autor
export const updateAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, birthYear } = req.body;

  try {
    const author = await prisma.author.update({
      where: { id: Number(id) },
      data: { name, birthYear }
    });
    res.json(author);
  } catch (error) {
    res.status(404).json({ error: 'Autor não encontrado ou erro ao atualizar' });
  }
};

// Deletar autor
export const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.author.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Autor não encontrado' });
  }
};
