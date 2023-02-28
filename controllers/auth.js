import db from "../config/db.js"
import util from 'util';

const query = util.promisify(db.query).bind(db);


export const addUser = (req , res ) => {
    //id validation
    const q = "SELECT * FROM members WHERE id = ?";

    db.query(q , req.body.id) 
        .then(([rows,fields]) => {
            // if id already exist
            if(rows.length){
                return res.status(200).json({rows ,message: "id already exist."})
            }else{
                const q2 = "INSERT INTO members(id, pass , name , email , regist_day , level, point) values( ? , ? , ? , ? , ? , 9, 0)"

                const values = [
                    req.body.id,
                    req.body.pass,
                    req.body.name,
                    req.body.email,
                    req.body.regist_day
                ]

                db.query(q2 , values)
                    .then(([rows,fields]) => {
                        return res.status(201).json({rows , message: "user has been created successfully"});
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.status(500).send("An error accured while fetching user data")
                    })
                return res.status(200).json({rows, message: "this id is validated"})
            }

        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send("An error accured while fetching user data")
        })


}
