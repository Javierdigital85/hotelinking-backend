import { Offer, PromoCode, User } from "../models";
import { v4 as uuidv4 } from "uuid";

export class PromoCodeRepository {
  static async generatePromoCode(userId: number, offerId: number) {
    const user = await User.findByPk(userId);
    const offer = await Offer.findByPk(offerId);

    if (!user || !offer) {
      throw new Error("User and offer not found");
    }

    const existingCode = await PromoCode.findOne({
      where: { userId, offerId },
    });

    if (existingCode) {
      return {
        alreadyExists: true,
        promoCode: existingCode,
      };
    }

    const code = uuidv4();

    const newPromoCode = await PromoCode.create({
      userId,
      offerId,
      code,
      redeem: false,
    });

    return {
      alreadyExists: false,
      promoCode: newPromoCode,
    };
  }

  static async redeemPromoCode(code: string) {
    const promoCode = await PromoCode.findOne({ where: { code } });

    if (!promoCode) {
      return null;
    }
    promoCode.redeem = true;
    promoCode.setDataValue("redeem", true);

    await promoCode.save();
    return promoCode;
  }

  static async getPromosCodes(userId: number) {
    const promos = await PromoCode.findAll({
      where: { userId },
      include: [{ model: Offer, as: "offer", attributes: ["title"] }],
    });
    return promos;
  }
}
