$(document).ready(() => {
  const total = 0;
  const cart = [];

  //if customer hasn't added items- have cart say- your cart is empty. Add items to get started.
  $("addtocartform").click((e) => {
    //collect item details to add to "your" order

    // get the id of element and find in array
    const products = $.get("/orderPage", (products) => products);
    // get id of btn element clicked (the btn will have the id of the product)
    const id = $("button").id;
    const productChosen = products.find((product) => products.id === id);
    const quantity = $("dropdown").val();

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
