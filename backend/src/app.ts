import express, { Request, Response } from "express";
import cors from 'cors';
import expenseRoute from './routes/expenseRoute';
import authRoute from './routes/authRoute';

const app = express();



app.use(express.json());
app.use(cors());


app.use('/api/auth', authRoute);
app.use('/api/expenses',  expenseRoute);




export default app;