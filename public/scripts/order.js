// const { Pool } = require("pg");
// const dbParams = require("lib/db.js");
// const db = new Pool(dbParams);
// db.connect();

$(document).ready(() => {
  const total = 0;
  const cart = [];
  // lib / db.js;
  //if customer hasn't added items- have cart say- your cart is empty. Add items to get started.
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

      $("input[id][name$='man']");

      // const quantity = $("input", `#${id}`).val();
      // console.log(quantity);

      if ($("cart-is-empty")) {
        $("your-order").remove("cart-is-empty");
      }

      const $orderItem = $(`<div>
  <p>${productChosen.title}</p>
  <p>${productChosen.title}</p>
  <p>${quantity}</p>
  </div>
  <button>Remove</button>`);
      // add Class?;

      $("your-order").append($orderItem);

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
