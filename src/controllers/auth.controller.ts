import { NextFunction, Request, Response } from 'express';

import AuthService from '../services/auth.service';
import { RequestWithUser } from "../types/auth";
import { IUser, UserDto } from "../types/users";

export default class AuthController {

  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const userData: IUser = req.body;
      const { userToken, findUser } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', 'Authorization=' + userToken)
          .status(200)
          .json(findUser as UserDto);
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {

    try {
      const logOutUserData: UserDto = await this.authService.logout(req.user);
      res.setHeader('Set-Cookie', 'Authorization=')
          .status(200)
          .json(logOutUserData);
    } catch (error) {
      next(error);
    }
  };
}
