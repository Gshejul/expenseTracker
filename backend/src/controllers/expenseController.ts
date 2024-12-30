import { Request, Response } from "express";
import { expenseSchema } from "../validators/expenseSchema";
import {  PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

// let expenses:number[] = [];


export const createExpenses= async(req:any, res:Response) => {
    try {
        const validateData = expenseSchema.parse(req.body);
        const { amount, category, description} = validateData;

        console.log("Validated Expense Data:", { amount, category, description });

        const expense = await prisma.expense.create({
            data: {
              amount,
              category,
              description,
              userId: req.user.id, 
            },
          })
          res.status(201).json(expense);
    } catch (error) {
        console.error("Error creating expense:", error);  
        res.status(400).json({ error: 'Failed to create expense' });
    }
}

export const getExpenses = async(req:Request, res:Response)=>{
    
    const userId = req.user.id

    try {
        const expenses = await prisma.expense.findMany({
            where:{userId}
        })
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve expenses' });
    }
}

export const updateExpenses = async(req:any, res:Response) => {
    const {id} = req.params;
    const {amount, category, description} = req.body;

    try {
        const expense = await prisma.expense.update({
            where: { id: Number(id) },
            data: { amount, category, description },
        })
        res.json(expense);
        
    } catch (error) {
        res.status(404).json({ error: 'Expense not found or update failed'});
    }
}

export const deleteExpense = async(req:any, res:Response) => {

    const {id} = req.params
    try {
        await prisma.expense.delete({
            where:{id:Number(id)}
        })
        res.status(204).send()
    } catch (error) {
        res.status(404).json({ error: 'Expense not found or delete failed' });
    }
}