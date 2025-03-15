function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    try {
      const products = await this.getData();
      if (!products) {
        console.error("No products found!");
        return null;
      }
      return products.find((item) => item.Id === id);
    } catch (error) {
      console.error("Error in findProductById:", error);
      return null;
    }
  }
}
