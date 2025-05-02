import request from "supertest";
import app from "../../app";

jest.mock("../../services/user.service");

import * as userService from "../../services/user.service";

describe("User Controller", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should register a user successfully", async () => {
    const mockUser = {
      id: 1,
      name: "Javier",
      email: "javier@example.com",
      password: "hashedpassword123",
      hash: "somehash",
      validatePassword: jest.fn().mockResolvedValue(true),
      _attributes: {},
    };
    jest.spyOn(userService, "createUser").mockResolvedValue(mockUser);
    jest.spyOn(userService, "findUser").mockResolvedValue(null);

    const response = await request(app).post("/api/users/register").send({
      name: "Javier",
      email: "javier@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
    expect(response.body.user).toMatchObject({
      id: 1,
      name: "Javier",
      email: "javier@example.com",
    });
  });

  it("should return an error if user already exists", async () => {
    jest
      .spyOn(userService, "findUser")
      .mockResolvedValue({ email: "javier@example.com" });

    const response = await request(app).post("/api/users/register").send({
      name: "Javier",
      email: "javier@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already exists!");
  });

  it("should login a user successfully", async () => {
    const mockUser = {
      id: 1,
      name: "Javier",
      email: "javier@example.com",
      password: "hashedpassword123",
      hash: "somehash",
      _attributes: {},
      dataValues: {},
      validatePassword: jest.fn().mockResolvedValue(true),
    };
    jest.spyOn(userService, "findUser").mockResolvedValue(mockUser);

    const response = await request(app).post("/api/users/login").send({
      email: "javier@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.email).toBe("javier@example.com");
  });

  it("should return an error if login credentials are invalid", async () => {
    jest.spyOn(userService, "findUser").mockResolvedValue(null);

    const response = await request(app).post("/api/users/login").send({
      email: "javier@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("User does not exist!");
  });

  it("should return an error if password is incorrect", async () => {
    const mockUser = {
      id: 1,
      name: "Javier",
      email: "javier@example.com",
      validatePassword: jest.fn().mockResolvedValue(false),
    };
    userService.findUser = jest.fn().mockResolvedValue(mockUser);

    const response = await request(app).post("/api/users/login").send({
      email: "javier@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("incorrent password");
  });
});
