import { RequestHandler } from "express";
import * as promoCodeService from "../services/promoCode.service";

export const createPromoCode: RequestHandler = async (req, res) => {
  try {
    const { userId, offerId } = req.body;
    if (!userId || !offerId) {
      res.status(400).json({message:"userId and offerId are required"});
      return;
    }
    const { alreadyExists, promoCode } =
      await promoCodeService.generatePromoCode(userId, offerId);

    if (alreadyExists) {
      res
        .status(200)
        .json({ message: "You already have a Promo code", code: promoCode });
      return;
    }
    res
      .status(201)
      .json({ message: "Promo code successfully generated", code: promoCode });
    return;
  } catch (error) {
    console.error("Error generating code:", error);
    res.status(500).json({ message: "Error generating promo code" });
    return;
  }
};

export const redeemCode: RequestHandler = async (req, res) => {
  try {
    const { codeId } = req.params;
    if (!codeId) {
      res.status(400).json({ message: "Missing promo code" });
      return;
    }

    const updated = await promoCodeService.redeemPromoCode(codeId);
    if (!updated) {
      res.status(404).json({ message: "Promo code not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Promo code successfully redeemed", promo: updated });
    return;
  } catch (error) {
    console.error("Error redeeming code:", error);
    res.status(500).json({ message: "Error redeeming promo code" });
  }
};

export const getPromos: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ error: "Missing userId in query params" });
      return;
    }
    const userIdNumber = Number(userId);
    if (isNaN(userIdNumber)) {
      res.status(400).json({ error: "Invalid userId format" });
      return;
    }
    const codes = await promoCodeService.getPromosCodes(Number(userId));
    res.status(200).json(codes);
    return;
  } catch (error) {
    console.error("Error redeeming code:", error);
  }
};
