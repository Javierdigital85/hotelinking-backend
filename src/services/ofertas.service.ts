import { OfferRepository } from "../repository/offerRepository";

export const create = async (title: string, details: string) => {
  const offer = await OfferRepository.create(title, details);
  return offer;
};

export const getAll = async () => {
  const AllOffers = await OfferRepository.getAll();
  return AllOffers;
};

export const getSingle = async (id: number) => {
  const offer = await OfferRepository.getSingle(id);
  return offer;
};
