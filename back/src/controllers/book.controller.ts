import { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import { Book } from '@prisma/client';

// Criar livro
export const createBook = async (req: Request, res: Response): Promise<any> => {
  const { title, isbn, publicationYear, authorId, categoryId } = req.body;

  try {
    const book = await prisma.book.create({
      data: { 
      title, 
      isbn, 
      publicationYear, 
      authorId: Number(authorId), 
      categoryId: Number(categoryId) 
      }
    });
    res.status(201).json(book);
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    res.status(500).json({ error: 'Erro ao criar o livro' });
  }
};

// Listar todos os livros
export const getAllBooks = async (_: Request, res: Response): Promise<any> => {
  const books = await prisma.book.findMany({
    include: { author: true, category: true }
  });
  res.json(books);
};

// Buscar por ID
export const getBookById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const book = await prisma.book.findUnique({
    where: { id: Number(id) },
    include: { author: true, category: true }
  });

  if (!book) return res.status(404).json({ error: 'Livro não encontrado' });

  res.json(book);
};

// Atualizar livro
export const updateBook = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { title, isbn, publicationYear, authorId, categoryId } = req.body;

  try {
    const book = await prisma.book.update({
      where: { id: Number(id) },
      data: { 
        title, 
        isbn, 
        publicationYear,
        authorId: Number(authorId),
        categoryId: Number(categoryId) 
      }
    });
    res.json(book);
  } catch (error) {
    res.status(404).json({ error: 'Livro não encontrado ou erro ao atualizar' });
  }
};

// Deletar livro
export const deleteBook = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    await prisma.book.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Livro não encontrado' });
  }
};
