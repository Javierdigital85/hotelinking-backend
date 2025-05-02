import { PromoCodeRepository } from "../repository/promoCodeRepository";

export const generatePromoCode = async (userId: number, offerId: number) => {
  return await PromoCodeRepository.generatePromoCode(userId, offerId);
};

export const redeemPromoCode = async (code: string) => {
  return await PromoCodeRepository.redeemPromoCode(code);
};

export const getPromosCodes = async (userId: number) => {
  return await PromoCodeRepository.getPromosCodes(userId);
};
