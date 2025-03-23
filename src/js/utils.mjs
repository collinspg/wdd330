// utils.mjs - Utility Functions

// Wrapper for querySelector
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// LocalStorage functions
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  if (!key || !data) return;
  localStorage.setItem(key, JSON.stringify(data));
}

// Event listeners
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// URL parameters
export function getParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

// Template rendering
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) parentElement.innerHTML = "";
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  return await res.text();
}

// Header/Footer loading
export async function loadHeaderFooter() {
  const basePath = window.location.pathname.split("/").length > 2 ? ".." : ".";
  const [header, footer] = await Promise.all([
    loadTemplate(`${basePath}/partials/header.html`),
    loadTemplate(`${basePath}/partials/footer.html`)
  ]);
  document.getElementById("main-header").innerHTML = header;
  document.getElementById("main-footer").innerHTML = footer;
  setTimeout(renderCartCount, 100);
}

// Cart functionality
export function cartSuperscript() {
  const cartCountElement = document.querySelector(".cart .cart-superscript");
  const cartItems = getLocalStorage("so-cart") || [];
  const numCartItems = cartItems.reduce((acc, item) => acc + (item.Qtd || 1), 0);
  
  cartCountElement.classList.toggle("hide", numCartItems === 0);
  if (numCartItems > 0) {
    cartCountElement.textContent = numCartItems;
    cartCountElement.classList.add("updated");
    setTimeout(() => cartCountElement.classList.remove("updated"), 300);
  }
}

// Unified cart functions
export function renderCartCount() {
  const cartCounter = document.getElementById("cart-count");
  if (!cartCounter) return;
  const count = getLocalStorage("so-cart")?.length || 0;
  cartCounter.textContent = count;
  cartCounter.classList.toggle("visible", count > 0);
}

// Helper functions
export const showElement = element => element.classList.add("visible");
export const hideElement = element => element.classList.add("hidden");

// Breadcrumbs
export function createBreadcrumbs(category = "", count = null) {
  const breadcrumbs = document.querySelector(".breadcrumbs");
  if (!breadcrumbs) return;
  
  breadcrumbs.textContent = window.location.pathname.includes("listing") 
    ? `${category} → (${count} items)`
    : category;
}