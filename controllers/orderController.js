import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    if (req.user.role !== "customer") {
      return res.status(403).json({ 
        message: "customer access only" 
    });
    }

    const { productId, quantity } = req.body;
    if (!productId || !quantity || Number(quantity) <= 0) {
      return res.status(400).json({ 
        message: "productId and quantity required" 
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "pdt not found"
      })
    }

    const order = await Order.create({
      userId: req.user.id,
      productId,
      quantity: Number(quantity),
    });

    const totalAmount = product.price * Number(quantity);

    return res.status(201).json({
      message: "order placed successfully",
      order,
      totalAmount,
    });
  } catch (error) {
    return res.status(500).json({ 
        message: "order creation failed", 
        error: error.message 
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.role !== "admin" && req.user.id.toString() !== userId) {
      return res.status(403).json({ 
        message: "access denied" 
      });
    }

    const orders = await Order.find({ userId }).populate("productId");
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ 
        message: "Fail fetching orders", 
        error: error.message 
    });
  }
};

