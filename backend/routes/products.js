const { Product } = require("../models/product");
const ProductScorer = require('../Shared/ProductScorer');
const express = require("express");
const router = express.Router();



router.post("/generateList", async (req, res) => {
  let list = [];
  for (const product of req.body) {
    await Product.findOne(
      { $query: { name: { $regex: product["name"], $options: "i" } } },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          list.push(data);
        }
      }
    ).sort({ price: 1 });
  }
  res.send(list);
});

router.post("/singleProductSearch", async (req, res) => {
  let stores = { "5f59e877f158c91676980f45": [], "5f59e826f158c91676980f44": [], "5f59e688f158c91676980f43": [] };
  for (let [key, value] of Object.entries(stores)) {
    let data = await Product.find({ $query: { storeId: { $regex: key, $options: "i" }, name: { $regex: req.body.name, $options: "i" } } }).limit(5);
    value.push(...data)
  }
  res.send(stores)
});

module.exports = router;