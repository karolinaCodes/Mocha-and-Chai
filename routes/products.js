// Retrieve all products info

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM products;`)
      .then((products) => {
        //return list of products
        return products;
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
