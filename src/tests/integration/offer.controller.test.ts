import request from "supertest";
import app from "../../app";
import { OfferRepository } from "../../repository/offerRepository";

jest.mock("../../repository/offerRepository");

describe("Offer Controller", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("POST /api/offer/creat-offer", () => {
    it("should create a new offer", async () => {
      const mockOffer = {
        id: 1,
        title: "Offer 1",
        details: "Offer details",
      };

      (OfferRepository.create as jest.Mock).mockResolvedValue(mockOffer);

      const response = await request(app).post("/api/offer/creat-offer").send({
        title: "Offer 1",
        details: "Offer details",
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Offer Created successfully");
      expect(response.body.offer).toEqual(mockOffer);
    });

    it("should return 400 if title or details are missing", async () => {
      const response = await request(app).post("/api/offer/creat-offer").send({
        title: "",
        details: "Offer details",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Title and details are required");
    });
  });

  describe("GET /api/offer/get-offers", () => {
    it("should return all offers", async () => {
      const mockOffers = [
        { id: 1, title: "Offer 1", details: "Details of Offer 1" },
        { id: 2, title: "Offer 2", details: "Details of Offer 2" },
      ];

      (OfferRepository.getAll as jest.Mock).mockResolvedValue(mockOffers);

      const response = await request(app).get("/api/offer/get-offers");

      expect(response.status).toBe(200);
      expect(response.body.offers).toEqual(mockOffers);
    });
  });

  describe("GET /api/offer/offer/:id", () => {
    it("should return a single offer by id", async () => {
      const mockOffer = {
        id: 1,
        title: "Offer 1",
        details: "Details of Offer 1",
      };

      (OfferRepository.getSingle as jest.Mock).mockResolvedValue(mockOffer);

      const response = await request(app).get("/api/offer/offer/1");

      expect(response.status).toBe(200);
      expect(response.body.offer).toEqual(mockOffer);
    });

    it("should return 404 if offer not found", async () => {
      (OfferRepository.getSingle as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/api/offer/offer/999");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Offer not found");
    });
  });
});
