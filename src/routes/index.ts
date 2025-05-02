import express from "express";
import userRouter from "./users.route";
import ofertasRouter from "./ofertas.route"
import promoRouter from "./promoCode.route"

const router = express.Router();

function routerConfig() {
  router.use("/users", userRouter);
  router.use("/offer",ofertasRouter)
  router.use("/promo-code",promoRouter)

  return router;
}

export default routerConfig;
