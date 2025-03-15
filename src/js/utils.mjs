// Wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Set a listener for both touchend and click
export function setClick(selector, callback) {
  const element = qs(selector);
  if (element) {
    element.addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    element.addEventListener("click", callback);
  }
}

// Helper to get parameter from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Reusable function to render lists with a template
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (!parentElement) return; // Ensure the parentElement exists

  if (clear) {
    parentElement.innerHTML = ""; // Clear content if `clear` is true
  }

  const htmlStrings = list.map(templateFn).join(""); // Generate HTML from template function
  parentElement.insertAdjacentHTML(position, htmlStrings); // Insert HTML at the specified position
}
