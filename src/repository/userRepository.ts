import { User } from "../models";

export class UserRepository {
  static async findUserByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  static async createUser(name: string, email: string, password: string) {
    return await User.create({ name, email, password });
  }

  static async getUserById(id: number) {
    return await User.findByPk(id);
  }
}
