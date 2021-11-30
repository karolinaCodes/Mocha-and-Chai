// Client facing scripts here
// Shopping Cart functionality

$(document).ready(() => {
  let total = 0;
  const cart = [];
  console.log(cart);

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

      const quantity = $("input[id=quantity" + id + "]").val();
      productChosen.qty = Number(quantity);
      console.log({ quantity });
      console.log({ productChosen });

      cart.push(productChosen);
      console.log(cart);

      // TODO:add empty cart msg, and remove it here- your cart is empty. Add items to get started.
      // if (cart.length) {
      //   $("#order-list").empty();
      // }

      const $orderItem = $(`<div>
      <p>${productChosen.title}</p>
      <p>$${productChosen.price.toFixed(2)}</p>
      <p>${productChosen.qty}</p>
      </div>
      <button>Remove</button>`);
      // add Class?;

      $("#order-list").append($orderItem);

      total += productChosen.price;

      if (total) {
        $(".Total_Summary").text(`Total: $${total.toFixed(2)}`);
      }
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
      //reset the quantity of dropdown to 1
      // $("input[id=" + id + "]").val("1");

      $("#customer-info").slideUp("slow");
    });
  });
});
