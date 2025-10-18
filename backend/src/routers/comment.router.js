import { Router } from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  getById,
  getByIdProductComment,
  updateComment,
} from "../controllers/comment.controller";
import { verifyJWT } from "../middleware/veryfyJWT.middleware";
import { restrictTo } from "../middleware/restrictTo.middleware";

const router = Router();

router.get("/", getAllComments);
router.get("/:id", getById);
router.get("/product/:id", getByIdProductComment);

router.post("/", verifyJWT, restrictTo("admin", "custom"), createComment);
router.put("/:id", verifyJWT, restrictTo("admin", "custom"), updateComment);
router.delete("/:id", verifyJWT, restrictTo("admin", "custom"), deleteComment);

export default router;
