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

router.use(verifyJWT);
router.use(restrictTo("user"));
router.post("/", createComment);
router.put("/:id", updateComment);

router.use(verifyJWT);
router.use(restrictTo("user"));
router.delete("/:id", deleteComment);

export default router;
