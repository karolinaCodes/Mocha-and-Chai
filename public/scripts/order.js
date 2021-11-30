// const { Pool } = require("pg");
// const dbParams = require("lib/db.js");
// const db = new Pool(dbParams);
// db.connect();

$(document).ready(() => {
  const total = 0;
  const cart = [];

  $(".add-to-cart").click((e) => {
    //collect item details to add to "your" order
    const products = $.get("/orderPage/products", (products) => {
      // console.log(products);
      // get id of btn element clicked
      const id = Number(e.target.id);
      // console.log("productId", id);

      const productChosen = products.find((product) => {
        return product.id === id;
      });

      // console.log("productChosen", productChosen);
      const quantity = $("input[id=" + id + "]").val();

      // TODO:add empty cart msg, and remove it here- your cart is empty. Add items to get started.
      // if ($("cart-is-empty")) {
      //   $("your-order").remove("cart-is-empty");
      // }

      const $orderItem = $(`<div>
  <p>${productChosen.title}</p>
  <p>$${productChosen.price.toFixed(2)}</p>
  <p>${quantity}</p>
  </div>
  <button>Remove</button>`);
      // add Class?;

      $("#order-list").append($orderItem);

      total += price;

      if (total) {
        $(`<p>Total ${total}</p>`);
      }

      cart.push(productChosen);
    });
  });

  $("orderbutton").click(() => {
    $("customerinfoform").slideDown("slow");
    // change button to submit so form info will be posted to db
    $("orderbtn").setAttribute("type", "submit");
  });

  $("orderbtn").submit(() => {
    //get order and user data, submit to db
    $("customerinfoform").slideUp("slow");
    //get the item data or the item 1

    //get data from form and from the cart
    $.post("/orderPage", data);
  });
});

// add to db
// order number
