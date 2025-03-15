function convertToJson(res) {
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return res.json();
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../public/json/${this.category}.json`;
  }

  async getData() {
    try {
      const response = await fetch(this.path);
      return convertToJson(response);
    } catch (error) {
      console.error("Error fetching product data:", error);
      return []; // Return an empty array to avoid breaking the app
    }
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.id === id); // Ensure your JSON keys match
  }
}
