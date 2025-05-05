import { Request, Response } from "express";
import { register, login } from "../../controller/users.controller";
import * as userService from "../../services/user.service";
import { generateToken } from "../../config/tokens";

jest.mock("../../config/tokens", () => ({
  generateToken: jest.fn(),
}));

const mockResponse = (): Response => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  res.send = jest.fn().mockReturnThis();
  res.cookie = jest.fn().mockReturnThis();
  return res;
};

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    test("should register a new user", async () => {
      const req = {
        body: {
          name: "Javier",
          email: "javier@example.com",
          password: "123456",
        },
      } as any;

      const res = mockResponse();

      jest.spyOn(userService, "findUser").mockResolvedValue(null);
      jest.spyOn(userService, "createUser").mockResolvedValue({
        id: 1,
        name: "Javier",
        email: "javier@example.com",
      });

      await register(req, res);

      expect(userService.findUser).toHaveBeenCalledWith("javier@example.com");
      expect(userService.createUser).toHaveBeenCalledWith(
        "Javier",
        "javier@example.com",
        "123456"
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "User registered successfully",
        user: {
          id: 1,
          name: "Javier",
          email: "javier@example.com",
        },
      });
    });

    test("should return 400 if user already exists", async () => {
      const req = {
        body: {
          name: "Javier",
          email: "javier@example.com",
          password: "123456",
        },
      } as any;

      const res = mockResponse();

      jest
        .spyOn(userService, "findUser")
        .mockResolvedValue({ email: "javier@example.com" });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "User already exists!",
      });
    });

    test("should return 500 on error", async () => {
      const req = {
        body: { name: "Javier", email: "fail", password: "123456" },
      } as any;
      const res = mockResponse();

      jest
        .spyOn(userService, "findUser")
        .mockRejectedValue(new Error("DB error"));

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Internal server error" })
      );
    });
  });

  describe("login", () => {
    test("should login user with correct credentials", async () => {
      const req = {
        body: {
          email: "javier@example.com",
          password: "123456",
        },
      } as any;

      const res = mockResponse();

      const fakeUser = {
        dataValues: {
          id: 1,
          name: "Javier",
          email: "javier@example.com",
        },
        validatePassword: jest.fn().mockResolvedValue(true),
      };

      jest.spyOn(userService, "findUser").mockResolvedValue(fakeUser);
      (generateToken as jest.Mock).mockReturnValue("fake-jwt-token");

      await login(req, res);

      expect(userService.findUser).toHaveBeenCalledWith("javier@example.com");
      expect(fakeUser.validatePassword).toHaveBeenCalledWith("123456");
      expect(generateToken).toHaveBeenCalledWith({
        id: 1,
        name: "Javier",
        email: "javier@example.com",
      });
      expect(res.cookie).toHaveBeenCalledWith(
        "token",
        "fake-jwt-token",
        expect.any(Object)
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        token: "fake-jwt-token",
        id: 1,
        name: "Javier",
        email: "javier@example.com",
      });
    });

    test("should return 401 if user not found", async () => {
      const req = {
        body: { email: "noone@example.com", password: "123456" },
      } as any;
      const res = mockResponse();

      jest.spyOn(userService, "findUser").mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "User does not exist!",
      });
    });

    test("should return 401 if password is invalid", async () => {
      const fakeUser = {
        validatePassword: jest.fn().mockResolvedValue(false),
      };

      jest.spyOn(userService, "findUser").mockResolvedValue(fakeUser);

      const req = {
        body: { email: "javier@example.com", password: "wrongpass" },
      } as any;
      const res = mockResponse();

      await login(req, res);

      expect(fakeUser.validatePassword).toHaveBeenCalledWith("wrongpass");
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "incorrent password" });
    });

    test("should return 500 on error", async () => {
      jest.spyOn(console, "error").mockImplementation(() => {}); // Silenciar error
      jest
        .spyOn(userService, "findUser")
        .mockRejectedValue(new Error("DB fail"));

      const req = { body: { email: "fail", password: "123" } } as any;
      const res = mockResponse();

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: "DB fail",
      });
    });
  });
});
