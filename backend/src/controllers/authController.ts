import { PrismaClient } from "@prisma/client";
import { registerSchema, loginSchema } from "../validators/authSchemas";
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import bcrypt from 'bcrypt';




const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "jsdfhajury74y4shjf";

export const register = async(req:Request, res:Response) => {
    const validatedData = await registerSchema.parse(req.body);

    const { name, email, password, role } = validatedData;

    const hashedPass = await bcrypt.hash(password, 10);
   try {
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPass,
                role
            }
        });
        res.status(201).json({ message: 'User registered successfully', data:user });
   } catch (error:any) {
    res.status(400).json({  error: 'User registration failed' });
   }

}


export const login = async(req:Request , res:Response) =>{

    const validatedData = await loginSchema.parse(req.body);
    const { email, password} = validatedData;
    try {
        const user = await prisma.user.findUnique({where:{email}});
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role.toUpperCase() }, SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", token });

    } catch (error:any) {
        res.status(500).json({ error: 'Login failed' });
    }
}