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

router.use(verifyJWT);
router.use(restrictTo("admin"));

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
