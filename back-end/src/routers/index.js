import { Router } from "express";

import routerCoffee from "./product.router";
import routerCategories from "./categories.router";

const router = Router();

router.use("/coffee", routerCoffee);
router.use("/categories", routerCategories);

export default router;
