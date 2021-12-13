import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import AbstractService from "./abstract.service";
import { HttpException } from '../../error/HttpException';
import userModel from "../../models/users.model";
import { IUser } from '../../types/users';

export default class AuthService<T extends IUser> extends AbstractService<IUser> {

  constructor() {
    super();
    this.model = userModel;
  }

  public async login<T>(userData: IUser): Promise<{ userToken: string; findUser: IUser }> {

    if (!userData) throw new HttpException(400, "You're not userData");
    const findUser: IUser = await this.model.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);
    const isPasswordMatching: boolean = await bcrypt.compareSync(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");
    const userToken: string = jwt.sign({
      _id: findUser._id
    }, <string>process.env.SECRET_KEY, {
      expiresIn: process.env.TOKEN_LIFETIME
    });
    return { userToken, findUser };
  }

  public async logout<T>(userData: IUser): Promise<IUser> {

    if (!userData) return <IUser>{}; //new HttpException(400, "You're not userData");
    const findUser: IUser = await this.model.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);
    return findUser;
  }
}
