import { RequestHandler } from "express";
import * as offersService from "../services/ofertas.service";

export const createOffer: RequestHandler = async (req, res) => {
  try {
    const { title, details } = req.body;
    const createOffer = await offersService.create(title, details);
    res
      .status(201)
      .json({ message: "Offer Created successfully", offer: createOffer });
    return;
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Internal server error", error: err });
    return;
  }
};

export const getOffers: RequestHandler = async (req, res) => {
  try {
    const getAll = await offersService.getAll();
    res.status(200).json({ offers: getAll });
    return;
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Internal server error", error: err });
    return;
  }
};

export const getOneOffer: RequestHandler = async (req, res): Promise<void> => {
  const { id } = req.params;
  try {
    const anOffer = await offersService.getSingle(Number(id));
    if (!anOffer) {
      res.status(404).json({ message: "Offer not found" });
      return;
    }
    res.status(200).json({ offer: anOffer });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Internal server error", error: err });
    return;
  }
};
