import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { RequestWithUser } from "../../types/auth";
import { IUser } from "../../types/users";

export default class AuthController {

  public authService = new AuthService<IUser>();

  public logIn = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const userData: IUser = req.body;
      const { cookie, findUser } = await this.authService.login<IUser>(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ findUser });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {

    try {
      const logOutUserData: IUser = await this.authService.logout<IUser>(req.user);
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ logOutUserData });
    } catch (error) {
      next(error);
    }
  };
}
