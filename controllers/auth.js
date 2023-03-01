import db from "../config/db.js";
import util from 'util';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const query = util.promisify(db.query).bind(db);


export const register = (req , res ) => {

    const q1 = "INSERT INTO members(id, pass , name ,level, point) values( ? , ? , ? , 9, 0)"

    const values = [
        req.body.id,
        hash,
        req.body.name,
    ]

    db.query(q , values) 
        .then(([rows,fields]) => {
        
            return res.status(200).json({rows, message: "id has been created"})
            })
        .catch((err) => {
            console.log(err);
            return res.status(500).send("An error accured while fetching user data")
        })


}



export const login = (req, res) => {
    const q = "SELECT * FROM members WHERE id = ?";

    db.query(q, req.body.id)
        .then(([rows, fields]) => {
            if (!rows.length) {
                return res.status(404).json("User not found!");
            }

            const idPassWordCorrect = bcrypt.compareSync(req.body.pass, rows[0].pass);

            if (!idPassWordCorrect) {
                return res.status(400).json("Wrong username or password");
            }

            const token = jwt.sign({ id: rows[0].id }, "jwtkeyforcheck");
            const { pass, ...other } = rows[0];

            res.cookie("access_token", token, { httpOnly: true });
            return res.status(200).json(other);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send("An error occurred while fetching user data");
        });
};


