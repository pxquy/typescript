import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getById,
  updateProduct,
} from "../controllers/products.controller";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
