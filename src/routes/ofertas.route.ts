import express from "express";
import * as ofertaController from "../controller/offer.controller";

const router = express.Router();

router.post("/creat-offer", ofertaController.createOffer);
router.get("/get-offers", ofertaController.getOffers);
router.get("/offer/:id", ofertaController.getOneOffer);

export default router;
