// Client facing scripts here
// Shopping Cart functionality
//export this ftn
const cartTotal = (cart) => {
  let total = 0;
  for (let cartItem of cart) {
    total += cartItem.price * cartItem.qty;
  }
  return total;
};

$(document).ready(() => {
  let cart = [];

  //// Add to cart buttons event handler ////
  $(".add-to-cart").click((e) => {
    //collect item details to add to "your" order
    $.get("/orderPage/products", (products) => {
      $("#empty-cart-msg").hide();
      console.log(products);
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
            $(".Total_Summary").text(`Total: $${cartTotal(cart).toFixed(2)}`);
          }
        }
        return;
      }

      // if item not in cart already, add to cart, append new item to cart, and increase price
      cart.push(productChosen);

      console.log(cart);

      const $orderItem = $(`
      <div data-product-id="${productChosen.id}">
      <p>${productChosen.title}</p>
      <p>$${productChosen.price.toFixed(2)}</p>
      <p id="cart-item-quantity">${productChosen.qty}</p>
      </div>
      <button id="remove-btn" data-product-id="${
        productChosen.id
      }" type="button" class="btn btn-dark"  data-mdb-ripple-color="dark"
      >Remove</button><hr class="my-0" />`);

      $("#order-list").append($orderItem);

      $(".Total_Summary").text(`Total: $${cartTotal(cart).toFixed(2)}`);

      //// Remove buttons event handler ////
      $("#order-list").click((e) => {
        $("#customer-info").slideUp("slow");
        // find the item in the cart and remove it, and update the quantity, the price on page and in the data sending to db
        //the id in format : {productId:10};
        const selectedItem = $(e.target).data();

        const filtered = cart.filter(
          (cartItem) => cartItem.id !== selectedItem.productId
        );
        cart = filtered;

        $(".Total_Summary").text(`Total: $${cartTotal(cart).toFixed(2)}`);

        $(`div[data-product-id="${selectedItem.productId}"]`).remove();
        $(`button[data-product-id="${selectedItem.productId}"]`).remove();
      });
    });
  });

  //// Order button event handler ////
  $(".Order_button").click(() => {
    if (!cart.length) {
      return;
    }
    $("#customer-info").slideDown("slow");
    $(".Order_button").text("Submit");

    //// Submit button event handler ////
    $(".Order_button").click(() => {
      $("#error-msg").remove();
      const first_name = $("[name='first_name']").val();
      const last_name = $("[name='last_name']").val();
      const email = $("[name='email']").val();
      const phone_no = $("[name='phone_no']").val();
      const total = cartTotal(cart);

      if (!first_name || !last_name || !phone_no) {
        let errorMsg = "Please enter:";
        if (!first_name) {
          errorMsg += "\n - your first name";
        }
        if (!last_name) {
          errorMsg += "\n - your last name";
        }
        if (!phone_no) {
          errorMsg += "\n - your phone number";
        }
        $("#customer-info").append(`<p id="error-msg">${errorMsg}</p>`);
        return;
      }

      const data = {
        first_name,
        last_name,
        email,
        phone_no,
        total,
        cart,
      };

      $.post("/orderPage", data, (orderdetails) => {
        //reset form
        $("[name='first_name']").val("");
        $("[name='last_name']").val("");
        $("[name='email']").val("");
        $("[name='phone_no']").val("");
        $("input.quantity").val("1");
        cart = [];

        $("#customer-info").slideUp("slow");
        $(".Order_button").hide();
        $(".Total_Summary").hide();
        $("button#remove-btn").hide();
        $("#sub-order-details").html(
          `<p>Order #: ${orderdetails.order_id}</p>
          <p id="order-status">Order Placed. </p>
          <p id="order-time-estimate">SMS with estimated time will be shared once order is accepted.</p>`
        );
        // check the db for estimated prep time from restaurant

        const intervalTimer = setInterval(() => {
          $.get(`/prepTime/${orderdetails.order_id}`, (estimated_time) => {
            console.log("estimated_time", estimated_time.estimated_time);
            if (estimated_time.estimated_time) {
              clearInterval(intervalTimer);
              $("#order-status").text("Order Accepted!");
              $("#order-time-estimate").text(
                `Your order will be ready in ${estimated_time.estimated_time} minutes.`
              );
            }
          });
        }, 12000);
      });
    });
  });
});
