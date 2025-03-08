import { Router } from "express";

import product from "../../models/products.js";
const router = Router();

router.get("/products",async(req, res) => {
  const response = await product.find();
  try {
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

router.get("/products/:id", async (req, res) => {
  const response = product.findOne({ _id: id });
  if (!response) {
    return res.status(404).send("couldn't find an product with the given id");
  }
  try {
    res.status(200).send(response);
  } catch (error) {}
});

router.post("/products", (req, res) => {
  const { body } = req;
  const response = new product({ body });
  try {
    if (!body) {
      return res.status(400).send("nothing was inputed");
    }
    const newProduct = response.save();
    res.status(200).send(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

router.delete("/products/:id", (req, res) => {
  try {
    const response = product.deleteOne({ _id: id });
    if (!response) {
      return res.status(404).send("couldn't find an product with the given id");
    }
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

router.patch("/products/:id", (req, res) => {
  const { body } = req;
  try {
    if (!body) {
      return res.status(400).send("No body given");
    }
    const response = product.findByIdAndUpdate(id, body, { new: true });
    if (!response) {
      return res.status(400).send("IDK some error");
    }
    res.status(200).send("updated");
  } catch (error) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

export default router;
