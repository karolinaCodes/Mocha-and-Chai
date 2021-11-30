// PG database client/connection setup
// const { Pool } = require("pg");
// const dbParams = require("lib/db.js");
// const db = new Pool(dbParams);
// db.connect();

// const getAllProducts = () => {
//   const x = db
//     .query(`SELECT * FROM products;`)
//     .then((data) => {
//       return data.rows;
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
//   console.log(x);
// };

// module.exports = { getAllProducts };
