const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");

const mongoose = require("mongoose");

module.exports = class CoopScrubber extends Scrubber {
  static translateSchema = {
    name: (x) => x.name,
    storeId: (x) => "Coop", // TODO: Add real storeId
    categoryId: (x) => this.getCategoryId(x),
    brand: (x) => x.manufacturer,
    price: (x) => x.price.value,
    packagingSize: (x) => x.packageSize,
    pricePerUnit: (x) =>
      x.comparisonPrice.formattedValue
        .replace(/[^\d:-]/g, "")
        .replace(":", "."),
    quantityType: (x) => x.packageSizeUnit,
    discount: (x) => x.potentialPromotions,
    labels: (x) => this.getLabels(x),
    isEcological: (x) => this.getEcological(x),
    countryOfOrigin: (x) => (x.fromSweden ? "Sverige" : "Inte från Sverige"), //Country of origin doesn't exist as a property (But it seems to exist in some productnames instead)
    imageUrl: (x) => x.images[0].url,
  };

  static getCategoryId(product) {
    //TODO EXCHANGE THIS ARRAY WITH CATEGORIES FROM THE DB
    const matJaktCategories = [
      { categoryName: "Mejeri & Ägg", id: 0 },
      { categoryName: "Ost", id: 1 },
      { categoryName: "Frukt & Grönsaker", id: 2 },
      { categoryName: "Skafferi", id: 3 },
      { categoryName: "Kött & Fågel", id: 4 },
      { categoryName: "Chark & Pålägg", id: 5 },
      { categoryName: "Vegetariskt", id: 6 },
      { categoryName: "Fisk & Skaldjur", id: 7 },
      { categoryName: "Dryck", id: 8 },
      { categoryName: "Bröd & Bageri", id: 9 },
      { categoryName: "Smaksättare", id: 10 },
      { categoryName: "Färdigmat", id: 11 },
      { categoryName: "Hem & Hushåll", id: 12 },
      { categoryName: "Frys", id: 13 },
      { categoryName: "Barn", id: 14 },
      { categoryName: "Skönhet & Hygien", id: 15 },
      { categoryName: "Hälsa & Tillskott", id: 16 },
      { categoryName: "Tobak", id: 17 },
      { categoryName: "Husdjur", id: 18 },
      { categoryName: "Världens Mat", id: 19 },
      { categoryName: "Övrigt", id: 20 },
    ];
    for (let i = 0; i < matJaktCategories.length - 1; i++) {
      if (
        product.categories[0].name.includes(matJaktCategories[i].categoryName)
      ) {
        return matJaktCategories[i].id;
      }
      //If nothing fits, return the category "Övrigt"
      return matJaktCategories[matJaktCategories.length - 1];
    }
  }

  static getPricePerUnit(productPrice, productUnit) {
    //productPrice = x.comparisonPrice.formattedValue.replace(/[^\d:-]/g, "").replace(":", "."),
    //productUnit = x.comparisonPrice.formattedValue.substr(x.comparisonPrice.formattedValue.lastIndexOf("/") + 1)
    //---------------------------------------------------------------------------------------------------------
    //Currently looks like we don't need to use the productUnit to change the value of comparisonPrice, but when we find out we do need to, we can do it here
    //As far as I can see so far Coop has already done the calculating for us: productUnit is either l, kg, or st.
    return productPrice;
  }

  // TODO: Add logic
  static getLabels(product) {
    return ["This", "is", "a", "label"];
  }

  static getEcological(product) {
    if (product.name.includes("Eko")) {
      return true;
    }
    return false;
  }
};
