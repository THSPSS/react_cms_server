import express from "express"
import dotenv from 'dotenv'
import boardListRoutes from "./routes/boardLists.js"
import authRoutes from "./routes/auths.js"
import cors from "cors"
import cookieParser from "cookie-parser"
//ES6 remove "type" : "module" from package.json file
dotenv.config();
const PORT = process.env.PORT || 8000;


const app = express();



app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes) 
app.use("/api/board",boardListRoutes);


app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})


