import { createPromoCode, redeemCode } from "../../controller/promoCode.controller";
import * as promoCodeService from "../../services/promoCode.service";

const mockReq: any = {};
const mockRes: any = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  send: jest.fn()
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createPromoCode controller", () => {
  it("should return 400 if required fields are missing", async () => {
    mockReq.body = { userId: null, offerId: null };

    await createPromoCode(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith("Missing required fields");
  });

  it("should return 200 if promo code already exists", async () => {
    mockReq.body = { userId: 1, offerId: 2 };
    jest.spyOn(promoCodeService, "generatePromoCode").mockResolvedValue({
      alreadyExists: true,
      promoCode: "EXISTING123"
    });

    await createPromoCode(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "You already have a Promo code",
      code: "EXISTING123"
    });
  });

  it("should return 201 when promo code is generated", async () => {
    mockReq.body = { userId: 1, offerId: 2 };
    jest.spyOn(promoCodeService, "generatePromoCode").mockResolvedValue({
      alreadyExists: false,
      promoCode: "NEW123"
    });

    await createPromoCode(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Promo code successfully generated",
      code: "NEW123"
    });
  });

  it("should return 500 on service error", async () => {
    mockReq.body = { userId: 1, offerId: 2 };
    jest
      .spyOn(promoCodeService, "generatePromoCode")
      .mockRejectedValue(new Error("DB Error"));

    await createPromoCode(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Error generating promo code"
    });
  });
});

describe("redeemCode controller", () => {
  it("should return 400 if codeId is missing", async () => {
    mockReq.params = {};

    await redeemCode(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Missing promo code"
    });
  });

  it("should return 404 if promo code is not found", async () => {
    mockReq.params = { codeId: "123" };
    jest.spyOn(promoCodeService, "redeemPromoCode").mockResolvedValue(null);

    await redeemCode(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Promo code not found"
    });
  });

  it("should return 200 if promo code is redeemed", async () => {
    const promoMock = { id: "123", used: true };
    mockReq.params = { codeId: "123" };
    jest
      .spyOn(promoCodeService, "redeemPromoCode")
      .mockResolvedValue(promoMock);

    await redeemCode(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Promo code successfully redeemed",
      promo: promoMock
    });
  });

  it("should return 500 if redeem fails", async () => {
    mockReq.params = { codeId: "123" };
    jest
      .spyOn(promoCodeService, "redeemPromoCode")
      .mockRejectedValue(new Error("DB fail"));

    await redeemCode(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Error redeeming promo code"
    });
  });
});
