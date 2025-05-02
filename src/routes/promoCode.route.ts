import express from "express";
import * as promoCodeController from "../controller/promoCode.controller";

const router = express.Router();

router.post("/create-promo", promoCodeController.createPromoCode);
router.put("/:codeId", promoCodeController.redeemCode);
router.get("/get-promos", promoCodeController.getPromos)

export default router