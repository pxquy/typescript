import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getById,
  productByCategory,
  updateProduct,
} from "../controllers/products.controller";
import { verifyJWT } from "../middleware/veryfyJWT.middleware";
import { restrictTo } from "../middleware/restrictTo.middleware";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getById);
router.get("/category/:id", productByCategory);

router.post("/", verifyJWT, restrictTo("admin"), createProduct);
router.put("/:id", verifyJWT, restrictTo("admin"), updateProduct);
router.delete("/:id", verifyJWT, restrictTo("admin"), deleteProduct);

export default router;
