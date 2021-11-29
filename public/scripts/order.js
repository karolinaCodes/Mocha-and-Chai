$(document).ready(() => {
  const total = 0;

  //if customer hasn't added items- have cart say- your cart is empty. Add items to get started.
  $("addtocartform").click((e) => {
    //collect item details to add to "your" order
    const title = $("").val();
    const price = $("").val();
    const quantity = $("dropdown").val();

    if ($("cart-is-empty")) {
      $("your-order").remove("cart-is-empty");
    }

    const $orderItem = $(`<div>
  <p>${title}</p>
  <p>${price}</p>
  <p>${quantity}</p>
  </div>
  <button>Remove</button>`);
    // add Class?;

    $("your-order").append($orderItem);

    total += price;

    if (total) {
      $(`<p>Total ${total}</p>`);
    }
  });

  $("placeorderform").click(() => {
    // have in html, display non and then slide down
    // const $customerInfoForm = $(
    //   `<div><form >
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

$.get("/productInfo", (products) => {});

// add to db
// order number
