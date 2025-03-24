// Import the ProductData and ProductDetails classes and use them to display the product details on the page.
import { getParam, loadHeaderFooter, getParams } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";


const productId = getParams("product");
const dataSource = new ProductData("tents");
const productID = getParam("product");


const product = new ProductDetails(productID, dataSource);
product.init();


//wk3 dynamic header footer
loadHeaderFooter();