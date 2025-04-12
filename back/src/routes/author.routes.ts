import { Router } from 'express';
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
} from '../controllers/author.controller';

const router = Router();

router.post('/', createAuthor);
router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

export default router;
