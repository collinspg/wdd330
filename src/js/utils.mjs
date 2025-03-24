// Import this file in your modules to use the utility functions
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// remove data from local storage
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// Function to render a list of items using a template
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position,
  clear = false,
) {
  // If the list is empty, render the empty template
  if (clear) {
    parentElement.innerHTML = "";
  }
  if (list.length === 0) {
    parentElement.insertAdjacentHTML(position, templateFn());
  } else {
    position = "afterbegin";
    const htmlStrings = list.map(templateFn);
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  }
}

export function renderWithTemplate(templateFn, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", templateFn);
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// Function to dynamically load the header and footer into page
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const header = document.querySelector("#header");
  const footer = document.querySelector("#footer");

  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);

  searchProducts();

  // Load cartSuperscript
  cartSuperscript();
}

function searchProducts() {
  const sButton = document.getElementById("searchButton");
  sButton.addEventListener("click", function (e) {
    const searchTerm = document.getElementById("searchInput").value;

    performSearch(searchTerm);
  });
}

export function performSearch(term) {
  console.log("Performing search for:", term);

  // Create the URL with the search term as a query parameter
  const searchParams = new URLSearchParams();
  searchParams.append("category", term);

  // Get the current URL without the query string
  const baseUrl = `${window.location.origin}/`;
  console.log("Base URL:", baseUrl);

  // Construct the full URL
  const newUrl = `product-listing/index.html?${searchParams.toString()}`;
  console.log("New URL:", newUrl);

  // Navigate to the new URL
  window.location.href = baseUrl + newUrl;
}

//add superscript to cart icon
export function cartSuperscript() {
  const cartCountElement = document.querySelector(".cart .cart-superscript");

  // Get number of items in cart
  const cartItems = getLocalStorage("so-cart") || [];
  const numCartItems = cartItems.reduce((acc, item) => acc + item.Qtd, 0);
  // console.log(cartItems);

 // If there are no items in the cart, hide the count
  if (numCartItems === 0) {
    cartCountElement.classList.add("hide");
  } else {
    cartCountElement.classList.remove("hide");
    cartCountElement.textContent = numCartItems;
    // Add the 'updated' class to trigger the animation
    cartCountElement.classList.add("updated");
  }
  // Remove the class after the animation ends
  setTimeout(() => {
    cartCountElement.classList.remove("updated");
  }, 300);
}