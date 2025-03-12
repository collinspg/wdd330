// File that will handle the dynamic product loading
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

//add to cart button
document.addEventListener("DOMContentLoaded", () => {
  const dataSource = new ProductData("tents");
  const productId = getParam("product");
  const product = new ProductDetails(productId, dataSource);
  product.init();
});