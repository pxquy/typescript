import { Router } from "express";

import routerCoffee from "./product.router";

const router = Router();

router.use("/coffee", routerCoffee);

export default router;
