import express from "express";
import { getBoardLists ,addBoardList, getBoardList } from "../controllers/boardList.js";

const router = express.Router();

router.get("/",getBoardLists);
router.get("/view", getBoardList);
router.post("/",addBoardList);


export default router








