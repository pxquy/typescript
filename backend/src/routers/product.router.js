import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getById,
  updateProduct,
} from "../controllers/products.controller";
import { verifyJWT } from "../middleware/veryfyJWT.middleware";
import { restrictTo } from "../middleware/restrictTo.middleware";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getById);

router.post("/", verifyJWT, restrictTo("admin"), createProduct);
router.put("/:id", verifyJWT, restrictTo("admin"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
