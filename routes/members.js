import express from 'express'
import { getMembersPoint } from '../controllers/member.js'


const router = express.Router()

router.get("/member_point", getMembersPoint)

export default router