// Import ProductData to fetch product data
import ProductData from './ProductData.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category; // Product category (e.g., "tents")
    this.dataSource = dataSource; // The data source (e.g., instance of ProductData)
    this.listElement = listElement; // The HTML element to render the product list
  }

  // The init method to initialize the product list
  async init() {
    try {
      // Fetch product data from the data source
      const productList = await this.dataSource.getData();
      // Render the product list
      this.render(productList);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  // Render the product list into the HTML element
  render(products) {
    // Map each product to its HTML card
    const productCards = products.map(product => this.createProductCard(product));
    
    // Insert the product cards into the listElement
    this.listElement.innerHTML = productCards.join('');
  }

  // Create an HTML card for each product
  createProductCard(product) {
    return `
      <div class="product-card">
        <img src="${product.Image}" alt="${product.Name}" class="product-card__image"/>
        <h3 class="product-card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
        <button class="add-to-cart-btn" data-id="${product.Id}">Add to Cart</button>
      </div>
    `;
  }
}
