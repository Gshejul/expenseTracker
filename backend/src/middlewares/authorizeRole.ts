import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
    user?: { role?: string }; 
}


export const  authorizeRole = (allowedRoles: string[]) => {
    
    return(req:AuthRequest, res:Response, next:NextFunction) => {
        console.log("User Role from Request:", req.user?.role);
        const userRole = req.user?.role?.toUpperCase()

        if(!userRole){
            return res.status(401).json({ error: "Unauthorized: No role found" });
        };
        
        console.log("Allowed Roles:", allowedRoles.map(role => role.toUpperCase()));

        if(!allowedRoles.map((r)=> r.toUpperCase()).includes(userRole)){
            return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
        };


        next();
    }
}