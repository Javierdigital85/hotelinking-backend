import { UserRepository } from "../repository/userRepository";

export const findUser = async (email: string) => {
  return await UserRepository.findUserByEmail(email);
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  return await UserRepository.createUser(name, email, password);
};

export const getUser = async (id: number) => {
  return await UserRepository.getUserById(id);
};
