import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getById,
  updateCategory,
} from "../controllers/categories.controller";
import { verifyJWT } from "../middleware/veryfyJWT.middleware";
import { restrictTo } from "../middleware/restrictTo.middleware";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getById);

router.use(verifyJWT);
router.use(restrictTo("admin"));
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
