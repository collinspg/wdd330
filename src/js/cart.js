// import { getLocalStorage } from "./utils.mjs";

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }

// renderCartContents();

import { getLocalStorage } from "./utils.mjs";

// Function to render the cart items or show an empty cart message
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty</p>";
    document.querySelector(".cart-total").innerHTML = ""; // Clear total if cart is empty
    return;
  }

  // Render cart items
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Calculate and display total price
  const totalPrice = cartItems.reduce((total, item) => total + item.FinalPrice, 0);
  document.querySelector(".cart-total").innerHTML = `Total: $${totalPrice.toFixed(2)}`;
}

// Function to create the HTML template for a cart item
function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.Quantity || 1}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

// Call the function to render the cart on page load
renderCartContents();
