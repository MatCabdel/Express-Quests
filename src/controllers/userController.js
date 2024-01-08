const database = require("../../database");

const getUsers = (req, res) => {
  const initialSql = "select * from users";
  const where = [];

  if (req.query.language != null) {
    where.push({
      column: "language",
      value: req.query.language,
    })
  }
  
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users); 
    })
    .catch((err) => {
 //     console.error(err);
      res.sendStatus(422);
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;
  database
  .query(
    "INSERT INTO users(firstname, lastname, email, city, language, hashedPassword ) VALUES (?, ?, ?, ?, ?, ?)",
    [firstname, lastname, email, city, language, hashedPassword ]
  )
  .then(([result]) => {
    res.status(201).send({ id: result.insertId });
  })
  .catch((err) => {
   // console.error(err);
   res.status(422).send({ message: err.message });
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
   //   console.error(err);
      res.status(422).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;

  database
    .query(
      "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? where id = ?",
      [firstname, lastname, email, city, language, hashedPassword, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
    //  console.error(err);
    res.status(422).send({ message: err.message });
    });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
};
