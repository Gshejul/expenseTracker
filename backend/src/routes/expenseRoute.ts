import { Router } from "express";
import { createExpenses, getExpenses, updateExpenses, deleteExpense} from "../controllers/expenseController";
import { authenticate } from "../middlewares/authenticate";
import { authorizeRole } from "../middlewares/authorizeRole";



const router = Router();



router.post('/create', authenticate, authorizeRole(['USER', 'ADMIN']), createExpenses);
router.get('/', authenticate, authorizeRole(['USER', 'ADMIN']), getExpenses);
router.put('/:id', authenticate, authorizeRole(['USER', 'ADMIN']), updateExpenses); // Route for updating an expense
router.delete('/:id', authenticate, authorizeRole(['USER', 'ADMIN']), deleteExpense);


export default router;