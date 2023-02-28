import expresss from 'express'
import { addUser } from '../controllers/auth.js';


const router = expresss.Router();

router.post("/register", addUser);

export default router