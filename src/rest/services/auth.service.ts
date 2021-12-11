import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { HttpException } from '@/error/HttpException';
import AbstractService from "@/rest/services/abstract.service";
import { IUser } from '@/types/users';

export default class AuthService<T extends IUser> extends AbstractService<IUser> {

  constructor() {
    super();
  }

  public async login<T>(userData: IUser): Promise<{ cookie: string; findUser: IUser }> {

    if (!userData) throw new HttpException(400, "You're not userData");
    const findUser: IUser = await this.model.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);
    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");
    const token = jwt.sign(findUser._id, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_LIFETIME });
    const cookie: string = `Authorization=${token}; HttpOnly; Max-Age=${process.env.TOKEN_LIFETIME};`;
    return { cookie, findUser };
  }

  public async logout<T>(userData: IUser): Promise<IUser> {

    if (!userData) throw new HttpException(400, "You're not userData");
    const findUser: IUser = await this.model.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);
    return findUser;
  }
}
