import { RequestHandler } from "express";
import * as userService from "../services/user.service";
import { generateToken } from "../config/tokens";

export const register: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await userService.findUser(email);

    if (!name || !email || !password) {
      res
        .status(400)
        .json({ message: "All fields are required: name, email, password" });
      return;
    }

    if (userEmail) {
      res.status(400).json({ message: "User already exists!" });
      return;
    }

    const user = await userService.createUser(name, email, password);
    res
      .status(201)
      .json({ message: "User registered successfully", user: user });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Internal server error", error: err });
    return;
  }
};

export const login: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await userService.findUser(email);
    if (!user) {
      res.status(401).json({ message: "User does not exist!" });
      return;
    }

    const isValid = await user.validatePassword(password);
    if (!isValid) {
      res.status(401).json({ message: "incorrent password" });
      return;
    }

    const payload = {
      id: user.dataValues.id,
      name: user.dataValues.name,
      email: user.dataValues.email,
    };

    const token = generateToken(payload);
    user.dataValues = { ...user.dataValues, token };

    console.log("User encontrado:", user);
    console.log("Payload:", payload);
    console.log("Token generado:", token);

    res.cookie("token", token, {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });
    res.status(200).send({ token, ...payload });
    return;
  } catch (error) {
    const err = error as Error;
    console.error("Error during login:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
    return;
  }
};

export const me: RequestHandler = (req, res) => {
  res.send(req.user);
  return;
};

export const getSingleUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await userService.getUser(Number(id));
    if (!getUser) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: getUser });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Internal server error", error: err });
    return;
  }
};

export const logout: RequestHandler = (req, res) => {
  try {
    res.clearCookie("token", {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
    console.log("res", res.clearCookie);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Internal server error", error: err });
    return;
  }
};
