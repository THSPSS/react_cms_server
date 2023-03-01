import expresss from 'express'
import { register , login } from '../controllers/auth.js';


const router = expresss.Router();

router.post("/register", register);
router.post("/login", login);

export default router