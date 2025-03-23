// Import the fetch function from the node-fetch module
// Import the convertToJson function from the utils module
function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }
  // Export the ProductData class
// The ProductData class will be used to fetch product data from the JSON file
  export default class ProductData {
    constructor(category) {
      this.category = category;
      this.path = `../json/${this.category}.json`;
    }
    getData() {
      return fetch(this.path)
        .then(convertToJson)
        .then((data) => data);
    }
    async findProductById(id) {
      const products = await this.getData();
      return products.find((item) => item.Id === id);
    }
  }