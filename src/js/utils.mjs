
// Import this file in your modules to use the utility functions
=======
// Wrapper for querySelector...returns matching element

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  if (!key || !data) {
    // console.error("setLocalStorage: Invalid key or data", { key, data });
    return;
  }
  localStorage.setItem(key, JSON.stringify(data));

}

// remove data from local storage
=======


// Set a listener for both touchend and click

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

// Get URL parameters
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Used by ProductList
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Render header/footer with template
export function renderWithTemplate(templateFn, parentElement) {
  if (parentElement) {
    parentElement.innerHTML = templateFn;
  } else {
    // console.warn(`Element not found for template insertion.`);
  }
}

export async function loadHeaderFooter() {
  // Detect if we're in `src/` (index.html) or a subdirectory (cart/index.html)
  const basePath = window.location.pathname.split("/").length > 2 ? ".." : ".";


  // Grab header/footer elements
  const header = document.getElementById("main-header");
  const footer = document.getElementById("main-footer");

  // Grab the template data using the correct basePath
  const headerTemplate = await loadTemplate(`${basePath}/partials/header.html`);
  const footerTemplate = await loadTemplate(`${basePath}/partials/footer.html`);

  // Insert templates into the DOM
  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);

  // Ensure the cart count updates AFTER the header is fully loaded
  setTimeout(() => {
    renderCartCount();
  }, 100);
}

// Fetch template content
export async function loadTemplate(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    return await response.text();
  } catch (error) {
    // console.error("Error loading template:", error);
    return "";
  }
}

// FIXED: Cart superscript updates correctly across all pages
//cart superscript
export function renderCartCount(){
  const cartCounter = document.getElementById("cart-count");
  // Add null check to prevent error
  if (!cartCounter) return;
  
  const cartCount = getCartCount();
  //check if cart has items to toggle visibility
  if (cartCount > 0){
    showElement(cartCounter);
  }
  else{
    hideElement(cartCounter);
  }
  //populate the div w/ the count
  cartCounter.innerText = cartCount;
}
//Toggle visibility of the cart depending on if something is in it
//default is hidden
export function showElement(element) {
  element.classList.add("visible");
  element.classList.remove("hidden");
}
export function hideElement(element) {
  element.classList.add("hidden");
  element.classList.remove("visible");
}
export function getCartCount() {
  const cart = getLocalStorage("cart");
  let cartCount = 0;
  if (cart !== null && cart !== undefined) {
    cartCount = cart.length;
  }
  return cartCount;
}

//Create Breadcrumbs
export function createBreadcrumbs(category = "",count = null) {
  const currentLocation = window.location.pathname;
  const breadcrumbs = document.querySelector(".breadcrumbs");
  if (currentLocation.includes("listing")) {
    breadcrumbs.innerHTML = `${category} -> (${count} items)`;
  } else if (currentLocation.includes("pages")) {
    breadcrumbs.innerHTML = `${category}`;
  }

}