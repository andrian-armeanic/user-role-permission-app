import bcrypt from 'bcrypt';
import { Document, model } from "mongoose";

import AbstractService from "@/rest/services/abstract.service";
import userSchema from "@/schemas/users.schema";
import { HttpException } from '@/tools/error/HttpException';
import { IUser } from '@/types/users';

export default class UserService extends AbstractService<IUser> {

  constructor() {
    super();
    this.model = model<IUser & Document>('users', userSchema);
  }

  /** @override */
  public async create(userData: IUser): Promise<IUser> {

    if (!userData) throw new HttpException(400, "You're not userData");
    const findUser: IUser = await this.model.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await this.model.create({...userData, password: hashedPassword});
  }

  /** @override */
  public async update(userId: string, userData: IUser): Promise<IUser> {

    if (!userData) throw new HttpException(400, "You're not userData");
    if (userData.email) {
      const findUser: IUser = await this.model.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
    }
    if (userData.password) userData = {...userData, password: bcrypt.hash(userData.password, 10)};
    const updateUserById: IUser = await this.model.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(409, "You're not user");
    return updateUserById;
  }

}
