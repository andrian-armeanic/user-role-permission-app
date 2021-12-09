import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import AbstractService from "@/rest/services/abstract.service";
import { HttpException } from '@/tools/error/HttpException';
import { TokenData } from '@/types/auth';
import { IUser } from '@/types/users';

class AuthService extends AbstractService<IUser> {

  constructor() {
    super();
  }

  public async login(userData: IUser): Promise<{ cookie: string; findUser: IUser }> {
    if (!userData) throw new HttpException(400, "You're not userData");

    const findUser: IUser = await this.model.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData: TokenData = {
      expiresIn: 3600,
      token: jwt.sign(findUser._id,
        process.env.SECRET_KEY,
      { expiresIn: 3600 }) };
    const cookie: string = `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;

    return { cookie, findUser };
  }

  public async logout(userData: IUser): Promise<IUser> {
    if (!userData) throw new HttpException(400, "You're not userData");

    const findUser: IUser = await this.model.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    return findUser;
  }

}

export default AuthService;
