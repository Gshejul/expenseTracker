import { Router } from "express";
import { register, login } from "../controllers/authController";
import { authenticate } from "../middlewares/authenticate";
import { authorizeRole } from "../middlewares/authorizeRole";




const router = Router();


router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get("/admin", authenticate, authorizeRole(["admin"]), (req, res) => {
    res.json({ message: "Welcome, admin!" });
});

router.get("/user", authenticate, authorizeRole(["user", "admin"]), (req, res) => {
    res.json({ message: "Welcome, user!" });
});


export default router;