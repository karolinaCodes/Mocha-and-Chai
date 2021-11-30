// const { Pool } = require("pg");
// const dbParams = require("lib/db.js");
// const db = new Pool(dbParams);
// db.connect();

$(document).ready(() => {
  let total = 0;
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

      total += productChosen.price;

      if (total) {
        $(".Total_Summary").text(`Total: $${total.toFixed(2)}`);
      }

      cart.push(productChosen);
    });
  });

  $(".Order_button").click(() => {
    $("#customer-info").slideDown("slow");
    // change button to submit so form info will be posted to db
    $(".Order_button").text("Submit");

    $(".Order_button").click(() => {
      const first_name = $("[name='first_name']").val();
      const last_name = $("[name='last_name']").val();
      const email = $("[name='email']").val();
      const phone_no = $("[name='phone_no']").val();

      //cart
      // console.log(first_name);
      const data = {
        first_name,
        last_name,
        email,
        phone_no,
      };

      $.post("/orderPage", data);
      //get order and user data, submit to db
      // $("customerinfoform").slideUp("slow");
    });
  });
});
