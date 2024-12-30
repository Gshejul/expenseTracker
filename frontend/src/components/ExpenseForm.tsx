import { useState } from 'react';
import { createExpense } from '../services/expenseService';




interface ExpenseFormProps {
    token: string;
    onExpenseAdded: () => void;
}


const ExpenseForm: React.FC<ExpenseFormProps> = ({token, onExpenseAdded}) => {
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')


     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createExpense(token, parseFloat(amount), description);
        onExpenseAdded(); // Callback to refresh expenses
        setAmount('');
        setDescription('');
     }    

        return(
            <>  
                <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                required
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
            />
            <button type="submit">Add Expense</button>
                </form>
            </>
        )
}




export default ExpenseForm;