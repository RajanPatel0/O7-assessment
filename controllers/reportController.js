import Order from "../models/Order.js";

export const getRevenue = async (req, res) => {
  try {
    const [summary] = await Order.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: { $multiply: ["$quantity", "$product.price"] },
          },
        },
      },
    ]);

    return res.status(200).json({ 
      totalRevenue: summary ? summary.totalRevenue : 0 
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "failed to calculate revenue", 
      error: error.message 
    });
  }
};
