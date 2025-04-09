import ExternalServices from "./ExternalServices.mjs"; 
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter, getParams, getLocalStorage, setLocalStorage } from "./utils.mjs";

const productId = getParams("product");
const dataSource = new ExternalServices("tents");

const product = new ProductDetails(productId, dataSource);

// Use an async IIFE to await product initialization
(async function initPage() {
  await product.init();         // Wait for product details to be rendered
  loadHeaderFooter();           // Load header and footer
  addRatingSystem();            // Existing rating system
  addCommentsSystem();          // New comments system
})();

function addRatingSystem() {
  const main = document.querySelector("main");
  if (!main) return;

  const ratingContainer = document.createElement("div");
  ratingContainer.className = "rating-container";
  ratingContainer.innerHTML = "<span>Rate this product: </span>";
  
  const maxRating = 5;
  for (let i = 1; i <= maxRating; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.dataset.rating = i;
    star.textContent = "☆";
    star.addEventListener("click", () => setRating(i));
    ratingContainer.appendChild(star);
  }
  
  main.appendChild(ratingContainer);
  const savedRating = localStorage.getItem(`rating-${productId}`);
  if (savedRating) setRating(parseInt(savedRating), false);
}

function setRating(rating, save = true) {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    star.textContent = parseInt(star.dataset.rating) <= rating ? "★" : "☆";
  });
  if (save) localStorage.setItem(`rating-${productId}`, rating);
}

// New Comments System
function addCommentsSystem() {
  const main = document.querySelector("main");
  if (!main) return;

  // Create comments container
  const commentsContainer = document.createElement("div");
  commentsContainer.className = "comments-container";
  
  commentsContainer.innerHTML = `
    <h2>Customer Comments</h2>
    <div id="commentList"></div>
    <form id="commentForm">
      <label for="comment">Add a Comment:</label>
      <textarea id="comment" name="comment" required></textarea>
      <button type="submit">Submit</button>
    </form>
  `;

  main.appendChild(commentsContainer);
  
  // Render existing comments
  renderComments();

  // Handle comment submission
  document.getElementById("commentForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const commentText = document.getElementById("comment").value.trim();
    if (commentText) {
      addComment(commentText);
      e.target.reset();
    }
  });
}

function renderComments() {
  const comments = getLocalStorage("comments")?.[productId] || [];
  const commentList = document.getElementById("commentList");
  if (!commentList) return;
  
  commentList.innerHTML = comments.map(c => `
    <div class="comment">
      <p>${c.text}</p>
      <small>Posted on ${c.date}</small>
    </div>
  `).join("");
}

function addComment(text) {
  const comments = getLocalStorage("comments") || {};
  if (!comments[productId]) comments[productId] = [];
  comments[productId].push({ text, date: new Date().toLocaleDateString() });
  setLocalStorage("comments", comments);
  renderComments();
}

