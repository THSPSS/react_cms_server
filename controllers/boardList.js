import db from '../config/db.js'
import util from 'util';

const query = util.promisify(db.query).bind(db);

export const getBoardLists = (req , res)=> {
    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)
    const start = (page - 1) * limit

    console.log({limit , page , start})

    const q1 = "SELECT num , id , name , subject , content , regist_day, hit FROM board ORDER BY num desc limit ? , ?";
    const q2 = "SELECT COUNT(num) AS total FROM board WHERE subject != 'NULL'"
    Promise.all([ db.query(q1, [start , limit]) , db.query(q2)])
        .then(([rows, [total]]) => {
            return res.status(200).json({ rows : rows[0], total : total });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send("An error occured while fetching board data")
        })


}

export const addBoardList = async (req , res)=> {
    const q = "INSERT INTO board (id, name, subject, content, hit) VALUES (? , ? , ? , ? , 0) "

    const values = [
        req.body.id,
        req.body.name,
        req.body.subject,
        req.body.content,
        req.body.regist_day
    ]
    //not contain file

    db.query(q, values)
        .then(([rows, fields]) => {
            return res.status(201).json({message:"content inserted correctly."});
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send("An error occured while fetching board data")
        })
}

export const getBoardList = (req , res) => {
    const hitUpdate = 1;
    
    const q1  = "SELECT * FROM board WHERE num = ? ";
    const q2 = "UPDATE board SET hit = hit + ? WHERE num = ?";

    console.log(req.params.num)

    Promise.all([ db.query(q1, req.params.num) , db.query(q2 , [hitUpdate ,req.params.num])])
        .then(([row , fields]) => {
            return res.status(200).json(row[0]);
        })
        .catch((err)=> {
            console.log(err)
            return res.status(500).json({message:"An error occured while fetching get single board list"})
        })

}

export const getRecentBoardList = (req , res) => {

    console.log("request for react posts")
    
    const q  = "SELECT * FROM board ORDER BY num desc LIMIT 5";

    db.query(q)
        .then(([rows , fields]) => {
            return res.status(200).json(rows);
        })
        .catch((err)=> {
            return res.status(500).json({message:"An error occured while fetching get recnet board list"})
        })

<<<<<<< HEAD
}                                                          
          
    // try {
    //     const q = "SELECT * FROM board";
    //     const [rows,fields] = await db.query(q);
    //     return res.status(200).json(rows);
    // } catch(err) {
    //     console.log(err);
    //     return res.status(500).send('An error occured while fetching location');
    // }
=======
}
>>>>>>> 08e341e6af9c4cc66f83feb4b692e09c8c5652bf
