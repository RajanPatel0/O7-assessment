import express from "express";
import { getRevenue, getTopCustomers } from "../controllers/reportController.js";

const router = express.Router();

router.get("/revenue", getRevenue);

export default router;
