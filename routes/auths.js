import expresss from 'express'
import { register , login, checkID , logout } from '../controllers/auth.js';


const router = expresss.Router();

router.post("/checkid", checkID);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router