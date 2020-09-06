const express = require("express");
const Product = require("../models/products");
const Admin = require("../models/admins");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Authentication = require("../middleware/auth")("admin");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });

const router = express.Router();
router.post("/AddProduct",[upload.array('image',8),Authentication], async (req, res, next) => {
  try {
    const productData = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      active:req.body.active,
      images: req.files.map((e) =>
        path.join(req.protocol + "://" + req.get("host") + "/images/" + e.filename).replace(/\\/g, "/").replace('http:','http:/')
      ),
    };
    const product = new Product(productData);
    await Product.populate(product,'category')
    await product.save((err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    res.status(200).send(product);
  } catch (error) {
    res.send(error);
  }
});

router.get("/GetAllProducts", async (req, res) => {
  try {
    const products = await Product.find({}).populate('category');
    res.status(200).send(products);

  } catch (error) {
    console.log(error)
    res.status(200).send(error);
  }
});

router.delete("/DeleteProduct", Authentication, async (req, res) => {});

module.exports = router;
