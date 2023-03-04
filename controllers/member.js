import db from '../config/db.js'
import util from 'util';

const query = util.promisify(db.query).bind(db);

export const getMembersPoint = (req, res) => {
    const q = "SELECT id , name , point FROM members ORDER BY point DESC"

    db.query(q)
        .then(([rows, fields]) => {
            return res.status(200).json(rows)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({message:"An error occured while fetching member lists"})
        })
}
