import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";


const SECRET = process.env.JWT_SECRET || "akhdasdh4r64tr";

export const authenticate = (req:any, res:Response, next:NextFunction) => {

    const token =  req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({error: "Unauthorized"});

    try {
        const payload = jwt.verify(token, SECRET);
        console.log("Decoded Payload:", payload);
        req.user = payload;
        next();
    } catch (error) {
        console.error("Token verification failed:", error); 
        res.status(401).json({ error: "Invalid token" });
    }
}