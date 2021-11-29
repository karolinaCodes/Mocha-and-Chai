// ======================================================
//  Create webpage for the customer for Orders
// ======================================================

const { Template } = require("ejs");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM products;`)
      .then((data) => {
        const menu = data.rows;
        const templateVars = { menuArray: menu };
        console.log(templateVars.menuArray);
        res.render("orderPage", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/orderPage", (req, res) => {
    const { first_name } = req.body;
    const { last_name } = req.body;
    const { email } = req.body;
    const { phone_no } = req.body;

    const { customer_id };
    const { date };
    const { total };
    const { order_url };
    const { status };
    const { estimated_time };

    //insert the data
    db.query(
      `INSERT INTO customers (first_name, last_name, email, phone_no)
    VALUES(${first_name}, ${last_name}, ${email}, ${phone_no});
    `
    )
      .then((data) => {
        const menu = data.rows;
        const templateVars = { menuArray: menu };
        console.log(templateVars.menuArray);
        res.render("orderPage", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

// have in html, display non and then slide down
// const $customerInfoForm = $(
//   `<div><form action="/orderPage" method="POST">
//   <input
//   type="text"
//   name="first_name"
//   placeholder="First name"
//   />

//   <input
//   type="text"
//   name="last_name"
//   placeholder="Last name"
//   />

//   <input
//     type="email"
//     name="email"
//     aria-describedby="emailHelp"
//     placeholder="Email"
//     />

//     <input
//     type="text"
//     name="phone_no"
//     placeholder="Phone number"
//     required
//     />
//     </form>
//     </div>`
// );
