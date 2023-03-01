import expresss from 'express'
import { register , login, checkID } from '../controllers/auth.js';


const router = expresss.Router();

router.post("/checkid", checkID);
router.post("/register", register);
router.post("/login", login);


export default router