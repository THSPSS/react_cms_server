import db from '../config/db.js'


export const getBoardLists = (req , res)=> {
    const q = "SELECT * FROM board";
    db.query(q)
        .then(([rows, fields]) => {
            return res.status(200).json(rows);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send("An error occured while fetching board data")
        })
}


export const addBoardList = (req , res)=> {
    const q = "INSERT INTO board (id, name, subject, content, regist_day, hit) VALUES (? , ? , ? , ? , ? , 0) "

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
    
    const q  = "SELECT * FROM board WHERE num = ? ";

    console.log(req.query.no)

    db.query(q , req.query.no )
        .then(([row , fields]) => {
            return res.status(200).json(row);
        })
        .catch((err)=> {
            console.log(err)
            return res.status(500).json({message:"An error occured while fetching get single board list"})
        })

}

    // try {
    //     const q = "SELECT * FROM board";
    //     const [rows,fields] = await db.query(q);
    //     return res.status(200).json(rows);
    // } catch(err) {
    //     console.log(err);
    //     return res.status(500).send('An error occured while fetching location');
    // }