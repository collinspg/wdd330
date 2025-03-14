// Import the necessary classes
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

// Get the HTML element where the product list will be rendered
const productListElement = document.querySelector('.product-list');

// Create a new ProductData instance, passing the category for the JSON file
const dataSource = new ProductData('tents');

// Create an instance of ProductList, passing the necessary arguments
const productList = new ProductList('tents', dataSource, productListElement);

// Initialize the ProductList to fetch and render the products
productList.init();
