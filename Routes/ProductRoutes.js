const router = require("express").Router();
const Products = require("../Models/ProductModel");
const Categories = require("../Models/ProductCategoriesModel");

router.get("/", (req, res) => {
  Products.find()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((error) => {
      res.status(500).send({ message: "Try again", error });
    });
});

router.get("/id/:id", (req, res) => {
  const id = req.params.id;
  Products.findById(id)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((error) => {
      res.status(500).send({ message: "Not Found", error });
    });
});

router.get("/category/electronics", (req, res) => {
  Products.find({ category: "electronics" })
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((error) => {
      res.status(500).send({ message: "Try again", error });
    });
});

router.get("/category/jewelery", (req, res) => {
  Products.find({ category: "jewelery" })
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((error) => {
      res.status(500).send({ message: "Try again", error });
    });
});

router.get("/category/mensclothing", (req, res) => {
  Products.find({ category: "men's clothing" })
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((error) => {
      res.status(500).send({ message: "Try again", error });
    });
});

router.get("/category/womensclothing", (req, res) => {
  Products.find({ category: "women's clothing" })
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((error) => {
      res.status(500).send({ message: "Try again", error });
    });
});

router.get("/categories", (req, res) => {
  Categories.find()
    .then((categories) => {
      res.status(200).send(categories);
    })
    .catch((error) => {
      res.status(500).send({ message: "Try again", error });
    });
});
module.exports = router;
