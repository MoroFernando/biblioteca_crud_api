import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

// Criar categoria
export const createCategory = async (req: Request, res: Response): Promise<any> => {
  const { name } = req.body;

  try {
    const category = await prisma.category.create({
      data: { name }
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
};

// Listar todas categorias
export const getAllCategories = async (_: Request, res: Response): Promise<any> => {
  const categories = await prisma.category.findMany({
    include: { books: true }
  });
  res.json(categories);
};

// Buscar categoria por ID
export const getCategoryById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
    include: { books: true }
  });

  if (!category) return res.status(404).json({ error: 'Categoria não encontrada' });

  res.json(category);
};

// Atualizar categoria
export const updateCategory = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { name }
    });
    res.json(category);
  } catch (error) {
    res.status(404).json({ error: 'Categoria não encontrada ou erro ao atualizar' });
  }
};

// Deletar categoria
export const deleteCategory = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    await prisma.category.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Categoria não encontrada' });
  }
};
