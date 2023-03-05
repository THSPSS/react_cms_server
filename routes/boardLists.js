import express from "express";
import { getBoardLists ,addBoardList, getBoardList, getRecentPost , deletePost} from "../controllers/boardList.js";

const router = express.Router();

router.get("/",getBoardLists);
router.get("/recent" , getRecentPost)
router.get("/:num", getBoardList);
router.post("/",addBoardList);
router.delete("/:num" , deletePost)



export default router








