import express from "express";
import { getBoardLists ,addBoardList, getBoardList ,getRecentBoardList} from "../controllers/boardList.js";

const router = express.Router();

router.get("/",getBoardLists);
router.get("/view", getBoardList);
router.get("/recent", getRecentBoardList)
router.post("/",addBoardList);


export default router








