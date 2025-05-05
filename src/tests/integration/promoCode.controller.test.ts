import request from "supertest";
import app from "../../app";

jest.mock("../../services/promoCode.service");

import * as promoCodeService from "../../services/promoCode.service";

describe("PromoCode Controller", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should return 400 if userId or offerId are required", async () => {
    const response = await request(app)
      .post("/api/promo-code/create-promo")
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("userId and offerId are required");
  });

  it("should create a promo code and return 201", async () => {
    const mockPromoCode = {
      id: 1,
      userId: 1,
      offerId: 2,
      code: "abc123",
      redeem: false,
    };

    jest.spyOn(promoCodeService, "generatePromoCode").mockResolvedValue({
      alreadyExists: false,
      promoCode: mockPromoCode,
    });

    const response = await request(app)
      .post("/api/promo-code/create-promo")
      .send({
        userId: 1,
        offerId: 2,
      });

    expect(response.status).toBe(201);
    expect(response.body.code.code).toEqual(mockPromoCode.code);
    expect(response.body.message).toBe("Promo code successfully generated");
  });

  it("should return 200 if promo code already exists", async () => {
    const mockPromoCode = {
      id: 1,
      userId: 1,
      offerId: 2,
      code: "abc123",
      redeem: false,
    };

    jest.spyOn(promoCodeService, "generatePromoCode").mockResolvedValue({
      alreadyExists: true,
      promoCode: mockPromoCode,
    });

    const response = await request(app)
      .post("/api/promo-code/create-promo")
      .send({
        userId: 1,
        offerId: 2,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("You already have a Promo code");
    expect(response.body.code).toEqual(mockPromoCode);
  });
});
