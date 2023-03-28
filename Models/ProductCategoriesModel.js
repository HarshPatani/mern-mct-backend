const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema({
  categories: [String],
});

module.exports = mongoose.model("Categories", categoriesSchema, "categories");
