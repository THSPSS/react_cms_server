import db from "../config/db.js";
import util from 'util';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const query = util.promisify(db.query).bind(db);


export const checkID = (req , res ) => {

    const userId = req.body.id
    let msg = "사용할 수 있는 이메일입니다."

    const q = "SELECT COUNT(id) AS cnt FROM members WHERE id = ? "

    db.query(q , userId)
        .then(([rows, fields]) => {
            if(rows[0].cnt !== 0){msg = "이미 가입된 이메일입니다."}
            return res.status(200).json({rows, message: msg})
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send("An error occured while fetching id data")
        })

}


export const register = (req , res ) => {

    const q = "INSERT INTO members(id, pass , name ,level, point) values( ? , ? , ? , 9, 0)"

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.pass , salt);

    const values = [
        req.body.id,
        hash,
        req.body.name,
    ]

    db.query(q , values) 
        .then(([rows,fields]) => {
            return res.status(201).json({rows , message: "user has been created successfully"});

        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send("An error accured while fetching user data")
        })


}



export const login = (req, res) => {

    let statusNum 
    let message
    let userInfo = null

    const q = "SELECT * FROM members WHERE id = ?";

    db.query(q, req.body.id)
        .then(([rows, fields]) => {
            if (!rows.length) {
                statusNum = 404
                message = "User not found!"
            } else {
                const idPassWordCorrect = bcrypt.compareSync(req.body.pass, rows[0].pass);

                if (!idPassWordCorrect) {
                    statusNum = 400
                    message = "Wrong username or password"
                } else{
                    const token = jwt.sign({ id: rows[0].id }, "jwtkeyforcheck");
                    const { pass, ...other } = rows[0];

                    statusNum = 200
                    message = "successfully logged in"
                    userInfo = other

                    res.cookie("access_token", token, { httpOnly: true });
                }
            }
            return res.status(statusNum).json({userInfo , message});
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send("An error occurred while fetching user data");
        });
};


