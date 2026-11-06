import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ 
        message: "only admin access" 
      });
    }

    const { name, price } = req.body;
    if (!name || price === undefined || Number(price) < 0) {
      return res.status(400).json({ 
        message: "name and price required" 
      });
    }

    const product = await Product.create({
      name,
      price: Number(price),
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ 
        message: "pdt creation failed", error: error.message 
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });  //make in ascending order in getting all
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ 
        message: "failed to fetch products", error: error.message 
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ 
        message: "only admin access" 
      });
    }

    const { id } = req.params;
    const { name, price } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (price !== undefined) updates.price = Number(price);

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "not valid fields" 
      });
    }

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) {
      return res.status(404).json({
         message: "pdt not found." 
        
        });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ 
        message: "pdt update failed", error: error.message 
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ 
        message: "only admin access" 
      });
    }

    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ 
        message: "pdt not found." 
      });
    }

    return res.status(200).json({ 
        message: "pdt deleted successfully" 
    });
  } catch (error) {
    return res.status(500).json({ 
        message: "pdt deletion failed", error: error.message 
    });
  }
};
