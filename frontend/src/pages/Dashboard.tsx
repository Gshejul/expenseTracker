import React, { useEffect, useState } from 'react';
import { fetchExpenses } from '../services/expenseService';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const loadExpenses = async () => {
            if (user) {
                const response = await fetchExpenses(user.token);
                setExpenses(response.data);
            }
        };
        loadExpenses();
    }, [user]);

    const handleExpenseAdded = () => {
        if (user) {
            fetchExpenses(user.token).then(response => setExpenses(response.data));
        }
    };

    return (
        <div>
            <h1>Your Expenses</h1>
            <ExpenseForm token={user?.token} onExpenseAdded={handleExpenseAdded} />
            <ExpenseList expenses={expenses} />
        </div>
    );
};

export default Dashboard;