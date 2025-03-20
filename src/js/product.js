<<<<<<< HEAD

// Import the ProductData and ProductDetails classes and use them to display the product details on the page.
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
=======
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";


const productId = getParams("product");
=======
import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";


loadHeaderFooter();
 
>>>>>>> ad47830 (team activity without strech done)
const dataSource = new ProductData("tents");
const productID = getParam("product");


const product = new ProductDetails(productID, dataSource);
product.init();
=======
const product = new ProductDetails(productId, dataSource);
product.init();

//wk3 dynamic header footer
loadHeaderFooter();

