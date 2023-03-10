import db from "../config/db.js";
import util from "util";
import jwt from "jsonwebtoken";

const query = util.promisify(db.query).bind(db);

export const getBoardLists = (req, res) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const start = (page - 1) * limit;

  console.log({ limit, page, start });

  const q1 =
    "SELECT num , id , name , subject , content , regist_day, hit FROM board ORDER BY num desc limit ? , ?";
  const q2 = "SELECT COUNT(num) AS total FROM board WHERE subject != 'NULL'";
  Promise.all([db.query(q1, [start, limit]), db.query(q2)])
    .then(([rows, [total]]) => {
      return res.status(200).json({ rows: rows[0], total: total });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("An error occured while fetching board data");
    });
};

export const addBoardList = (req, res) => {
  const q =
    "INSERT INTO board (id, name, subject, content, hit) VALUES (? , ? , ? , ? , 0) ";

  const values = [
    req.body.id,
    req.body.name,
    req.body.subject,
    req.body.content,
  ];
  //not contain file

  db.query(q, values)
    .then(([rows, fields]) => {
      return res.status(201).json({ message: "content inserted correctly." });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("An error occured while fetching board data");
    });
};

export const getBoardList = (req, res) => {
  const hitUpdate = 1;

  const q1 = "SELECT * FROM board WHERE num = ? ";
  const q2 = "UPDATE board SET hit = hit + ? WHERE num = ?";

  Promise.all([
    db.query(q1, req.params.num),
    db.query(q2, [hitUpdate, req.params.num]),
  ])
    .then(([row, fields]) => {
      return res.status(200).json(row[0]);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "An error occured while fetching get single board list",
      });
    });
};

export const getRecentPost = (req, res) => {
  const postLimit = 5;
  const q = " SELECT * FROM board ORDER BY num DESC LIMIT ? ";

  db.query(q, postLimit)
    .then(([rows, fields]) => {
      return res.status(200).json(rows);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "An error occured while fetching get recent board list",
      });
    });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Not authenticated!" });

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const postNum = req.params.num;
    const q = "DELETE * FROM board WHERE `num` = ? AND `id` = ?";

    db.query(q, [postNum, userInfo.id], (err, data) => {
      if (err)
        return res
          .status(403)
          .json({ message: "You can delete only your post!" });

      return res.json({ message: "Post has been deleted!" });
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_toekn;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const postNum = req.params.num;
    const q =
      "UPDATE subject , content FROM board WHERE `num` = ? AND `id` = ?";

    const values = [req.body.subject, req.body.content];

    db.query(q, values, [postNum, userInfo.id], (err, data) => {
      if (err)
        return res
          .status(403)
          .json({ message: "You can update only your post!" });

      return res.json({ message: "Post has been updated!" });
    });
  });
};
