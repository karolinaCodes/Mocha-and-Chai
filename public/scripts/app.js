// Client facing scripts here
// Shopping Cart functionality

$(document).ready(() => {
  let total = 0;
  let cart = [];

  $(".add-to-cart").click((e) => {
    e.preventDefault();
    //collect item details to add to "your" order
    $.get("/orderPage/products", (products) => {
      $("#empty-cart-msg").hide();
    }).then((products) => {
      // get id of btn element clicked
      const id = Number(e.target.id);

      const productChosen = products.find((product) => {
        return product.id === id;
      });

      const quantity = $("input[id=" + id + "]").val();
      productChosen.qty = Number(quantity);

      // if item is already in cart, increase the qty in cart by the submitted quantity and update the price
      if (cart.some((cartItem) => cartItem.id === id)) {
        for (let cartItem of cart) {
          if (cartItem.id === id) {
            cartItem.qty += productChosen.qty;
            $("#cart-item-quantity").text(cartItem.qty);

            total += productChosen.price * productChosen.qty;
            $(".Total_Summary").text(`Total: $${total.toFixed(2)}`);
          }
        }
        return;
      }

      // if item not in cart already, add to cart, append new item to cart, and increase price
      cart.push(productChosen);

      //TODO: remove btn
      console.log(cart);

      const $orderItem = $(`<div>
      <p>${productChosen.title}</p>
      <p>$${productChosen.price.toFixed(2)}</p>
      <p id="cart-item-quantity">${productChosen.qty}</p>
      </div>
      <button id="remove-btn">Remove</button>`);
      // add Class?;

      $("#order-list").append($orderItem);

      total += productChosen.price * productChosen.qty;

      $(".Total_Summary").text(`Total: $${total.toFixed(2)}`);
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
      const data = {
        first_name,
        last_name,
        email,
        phone_no,
        total,
        cart,
      };

      $.post("/orderPage", data);

      //reset form
      $("[name='first_name']").val("");
      $("[name='last_name']").val("");
      $("[name='email']").val("");
      $("[name='phone_no']").val("");
      total = 0;
      cart = [];
      //reset the quantity of dropdown to 1
      // $("input[id=" + id + "]").val("1");

      $("#customer-info").slideUp("slow");
      $(".Order_button").hide();
      $(".Total_Summary").hide();
      $("#remove-btn").hide();
    });
  });
});
