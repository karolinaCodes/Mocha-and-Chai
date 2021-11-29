const { Template } = require("ejs");
const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {

        res.render("login");

  });

  router.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(`SELECT * FROM restaurants;`)
    .then((data) => {
      const users = data.rows[0];
      console.log(users);
      const usernamedb = users.username;
      const passworddb = users.password;
      console.log(usernamedb);
      console.log(passworddb);
      if (username === usernamedb && password === passworddb) {
        res.redirect("resturantPage");
       }
      else {
        res.status(404).send("Please enter a valid username and password!");
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });
  return router;
};



