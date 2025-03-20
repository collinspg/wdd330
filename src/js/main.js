<<<<<<< HEAD
//js for the main html page
import { loadHeaderFooter } from "./utils.mjs";

//load header/footer wk 3
loadHeaderFooter();
=======

import { loadHeaderFooter } from "./utils.mjs"; 
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";


loadHeaderFooter();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);
 
productList.init();
>>>>>>> ad47830 (team activity without strech done)
