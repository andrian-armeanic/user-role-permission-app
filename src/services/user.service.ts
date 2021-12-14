import bcrypt from 'bcrypt';

import AbstractService from "./abstract.service";
import userModel from "../models/users.model";
import { HttpException } from '../error/HttpException';
import { IUser } from '../types/users';
import StatusCodes from "../types/statusCode";

export default class UserService extends AbstractService<IUser> {

  constructor() {
    super();
    this.model = userModel;
  }

  /** @override */
  public async create<T>(data: IUser): Promise<T> {

    if (!data) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "You're not userData");
    }
    const findUser: T = await this.model.findOne({ email: data.email });
    if (findUser) {
      throw new HttpException(StatusCodes.CONFLICT, `You're email ${data.email} already exists`);
    }
    const hashedPassword = await bcrypt.hashSync(data.password, bcrypt.genSaltSync());
    return this.model.create({...data, password: hashedPassword});
  }

  /** @override */
  public async update<T>(userId: string, userData: IUser): Promise<T> {

    if (!userData) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "You're not userData");
    }
    if (userData.email) {
      const findUser: IUser = await this.model.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) {
        throw new HttpException(StatusCodes.CONFLICT, `You're email ${userData.email} already exists`);
      }
    }
    const encryptedPassword: string = await bcrypt.hash(userData.password, 10);
    if (userData.password) {
      userData = {...userData, password: encryptedPassword };
    }
    const updateUserById: T = await this.model.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) {
      throw new HttpException(StatusCodes.CONFLICT, "You're not user");
    }
    return updateUserById;
  }

}
