const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();

router.post("/generateList", async (req, res) => {
  let list = [];
  for (const product of req.body) {
    let match = await Product.findOne({
      $query: { name: { $regex: product["name"], $options: "i" } },
    }).sort({ price: 1 });
    list.push(match);
  }
  res.send(list);
});

router.post("/singleProductSearch", async (req, res) => {
  let stores = {
    "5f59e877f158c91676980f45": [],
    "5f59e826f158c91676980f44": [],
    "5f59e688f158c91676980f43": [],
  };
  for (let [key, value] of Object.entries(stores)) {
    let data = await Product.find({
      storeId: key,
      name: new RegExp(req.body.name, "i"),
    }).limit(5);
    value.push(...data);
  }
  res.send(stores);
});

module.exports = router;
