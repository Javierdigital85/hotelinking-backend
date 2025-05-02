import {
  createOffer,
  getOffers,
  getOneOffer,
} from "../../controller/offer.controller";
import * as offersService from "../../services/ofertas.service";
import { Request, Response } from "express";

jest.mock("../../services/ofertas.service");

describe("Ofertas Controller", () => {
  let req = {} as Request;
  let res = {} as Response;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  describe("createOffer", () => {
    it("should create an offer and return 201", async () => {
      req.body = { title: "Dev job", details: "Great opportunity" };
      const mockOffer = {
        id: 1,
        title: "Dev job",
        details: "Great opportunity",
      };
      (offersService.create as jest.Mock).mockResolvedValue(mockOffer);

      await createOffer(req, res);

      expect(offersService.create).toHaveBeenCalledWith(
        "Dev job",
        "Great opportunity"
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Offer Created successfully",
        offer: mockOffer,
      });
    });

    it("should return 500 on error", async () => {
      req.body = { title: "Error", details: "Oops" };
      (offersService.create as jest.Mock).mockRejectedValue(
        new Error("DB Error")
      );

      await createOffer(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Internal server error",
        })
      );
    });
  });

  describe("getOffers", () => {
    it("should return all offers", async () => {
      const ofertas = [
        { id: 1, title: "Oferta A" },
        { id: 2, title: "Oferta B" },
      ];
      (offersService.getAll as jest.Mock).mockResolvedValue(ofertas);

      await getOffers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ offers: ofertas });
    });

    it("should return 500 on error", async () => {
      (offersService.getAll as jest.Mock).mockRejectedValue(
        new Error("Server error")
      );

      await getOffers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Internal server error",
        })
      );
    });
  });

  describe("getOneOffer", () => {
    it("should return a single offer", async () => {
      req.params = { id: "1" };
      const oferta = { id: 1, title: "Oferta A" };
      (offersService.getSingle as jest.Mock).mockResolvedValue(oferta);

      await getOneOffer(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ offer: oferta });
    });

    it("should return 404 if offer not found", async () => {
      req.params = { id: "99" };
      (offersService.getSingle as jest.Mock).mockResolvedValue(null);

      await getOneOffer(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Offer not found" });
    });

    it("should return 500 on error", async () => {
      req.params = { id: "1" };
      (offersService.getSingle as jest.Mock).mockRejectedValue(
        new Error("DB fail")
      );

      await getOneOffer(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: expect.any(Error),
      });
    });
  });
});
