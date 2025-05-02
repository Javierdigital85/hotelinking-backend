import { Offer } from "../models";

export class OfferRepository {
  static async create(title: string, details: string) {
    return await Offer.create({ title, details });
  }

  static async getAll() {
    return await Offer.findAll();
  }

  static async getSingle(id: number) {
    return await Offer.findOne({ where: { id } });
  }
}
