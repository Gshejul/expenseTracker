import React from 'react';

interface Expense {
    id: number;
    amount: number;
    description: string;
}

interface ExpenseListProps {
    expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
    return (
        <ul>
            {expenses.map((expense) => (
                <li key={expense.id}>
                    {expense.description}: ${expense.amount}
                </li>
            ))}
        </ul>
    );
};

export default ExpenseList;