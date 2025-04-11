import { Router } from 'express';
import {
  createLoan,
  getAllLoans,
  getLoanById,
  updateLoan,
  deleteLoan
} from '../controllers/loan.controller';

const router = Router();

router.post('/', createLoan);
router.get('/', getAllLoans);
router.get('/:id', getLoanById);
router.put('/:id', updateLoan);
router.delete('/:id', deleteLoan);

export default router;
