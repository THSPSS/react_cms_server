import express from "express";
import { getBoardLists ,addBoardList, getBoardList, getRecentPost} from "../controllers/boardList.js";

const router = express.Router();

router.get("/",getBoardLists);
router.get("/recent" , getRecentPost)
router.get("/:num", getBoardList);
router.post("/",addBoardList);


export default router








