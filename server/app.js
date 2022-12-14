const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
app.use(express.json({ limit: "10mb" }));
app.use(cors());
const mysql = require("mysql");
const md5 = require("js-md5");
const uuid = require("uuid");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "auto_servisas",
});

const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf("/admin")) {
    // admin
    const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length || results[0].role !== "admin") {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  } else if (
    0 === req.url.indexOf("/login-check") ||
    0 === req.url.indexOf("/login")
  ) {
    next();
  } else {
    // fron
    const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  }
};
app.use(doAuth);

// AUTH
app.get("/login-check", (req, res) => {
  let sql;
  let requests;
  if (req.query.role === "admin") {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ? AND role = ?
      `;
    requests = [req.headers["authorization"] || "", req.query.role];
  } else {
    sql = `
      SELECT
      name, id
      FROM users
      WHERE session = ?
      `;
    requests = [req.headers["authorization"] || ""];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: "error" });
    } else {
      res.send({ msg: "ok", result });
    }
  });
});

//LOGIN
app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: "error", key: "" });
    } else {
      res.send({ msg: "ok", key });
    }
  });
});

//BACK READ FIXERS
app.get("/admin/fixers", (req, res) => {
  const sql = `
  SELECT f.id, f.name, f.surname, f.specialization, s.title AS serv, f.city, f.photo
  FROM fixers AS f
  LEFT JOIN services AS s
  ON s.id = f.service_id
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//BACK READ SERVICES
app.get("/admin/services", (req, res) => {
  const sql = `
  SELECT *
  FROM services
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//BACK CREATE SERVICE
app.post("/admin/services", (req, res) => {
  const sql = `
    INSERT INTO services
    (title)
    VALUES (?)
    `;
  con.query(sql, [req.body.title], (err, result) => {
    if (err) throw err;
    res.send({
      result,
      msg: { text: "Servisas buvo sukurtas!", type: "success" },
    });
  });
});

//BACK CREATE FIXER
app.post("/admin/fixers", (req, res) => {
  const sql = `
    INSERT INTO fixers
    (name, surname, specialization, service_id, city, photo)
    VALUES (?, ?, ?, ?, ?, ?)
    `;
  con.query(
    sql,
    [
      req.body.name,
      req.body.surname,
      req.body.specialization,
      req.body.serv,
      req.body.city,
      req.body.photo,
    ],
    (err, result) => {
      if (err) throw err;
      res.send({
        result,
        msg: { text: "Meistro apra??as buvo sukurtas!", type: "success" },
      });
    }
  );
});

//BACK DELETE SERVICE
app.delete("/admin/services/:id", (req, res) => {
  const sql = `
    DELETE FROM services
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({
      result,
      msg: { text: "Servisas buvo i??trintas!", type: "danger" },
    });
  });
});

//BACK DELETE FIXER
app.delete("/admin/fixers/:id", (req, res) => {
  const sql = `
    DELETE FROM fixers
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({
      result,
      msg: { text: "Meistro apra??as buvo i??trintas!", type: "danger" },
    });
  });
});

//BACK EDIT SERVICE
app.put("/admin/services/:id", (req, res) => {
  const sql = `
  UPDATE services
  SET title = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.title, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({
      result,
      msg: { text: "Your clothing has been edited!", type: "info" },
    });
  });
});

//BACK EDIT FIXER
app.put("/admin/fixers/:id", (req, res) => {
  const sql = `
  UPDATE fixers
  SET name = ?, surname = ?, specialization = ?, service_id = ?, city = ?, photo = ?
  WHERE id = ?
  `;
  con.query(
    sql,
    [
      req.body.name,
      req.body.surname,
      req.body.specialization,
      req.body.serv,
      req.body.city,
      req.body.photo,
      req.params.id,
    ],
    (err, result) => {
      if (err) throw err;
      res.send({
        result,
        msg: { text: "Your clothing has been edited!", type: "info" },
      });
    }
  );
});

//FRONT READ FIXERS
app.get("/fixers", (req, res) => {
  const sql = `
  SELECT f.id, f.name, f.surname, f.specialization, s.title AS serv, f.city, f.photo, f.rates, f.rate_sum
  FROM fixers AS f
  LEFT JOIN services AS s
  ON s.id = f.service_id
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put("/rates/:id", (req, res) => {
  const sql = `
  UPDATE fixers
  SET rates = rates + 1, rate_sum = rate_sum + ?
  WHERE id = ?
`;
  con.query(sql, [req.body.rate, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: "A??i?? u?? ??vertinim??!", type: "success" } });
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
