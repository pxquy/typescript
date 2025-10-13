import { Router } from "express";

import routerCoffee from "./product.router";
import routerCategories from "./categories.router";
import routerAuth from "./auth.router";
import routerComment from "./comment.router";

const router = Router();

router.use("/coffee", routerCoffee);
router.use("/categories", routerCategories);
router.use("/auth", routerAuth);
router.use("/comments", routerComment);

export default router;
